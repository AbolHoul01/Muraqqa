package handler

import (
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/delivery/http/middleware"
	"github.com/AbolHoul01/Muraqqa/apps/api/internal/domain"
	"github.com/gin-gonic/gin"
)

// ResumeHandler handles HTTP requests for zero-knowledge encrypted resumes.
type ResumeHandler struct {
	resumeUseCase domain.ResumeUseCase
}

// NewResumeHandler constructs a new ResumeHandler.
func NewResumeHandler(resumeUseCase domain.ResumeUseCase) *ResumeHandler {
	return &ResumeHandler{resumeUseCase: resumeUseCase}
}

type SaveResumeRequest struct {
	Title     string          `json:"title"`
	RawJSON   json.RawMessage `json:"raw_json" binding:"required"`
	SecretKey string          `json:"secret_key"`
}

func parseSecretKey(keyStr string) ([]byte, error) {
	if len(keyStr) == 0 {
		return nil, errors.New("secret encryption key is required")
	}

	// 1. Raw 32 bytes key string
	if len(keyStr) == 32 {
		return []byte(keyStr), nil
	}

	// 2. Hex encoded 32-byte key (64 hex characters)
	if len(keyStr) == 64 {
		decoded, err := hex.DecodeString(keyStr)
		if err == nil && len(decoded) == 32 {
			return decoded, nil
		}
	}

	// 3. Base64 encoded 32-byte key
	decoded, err := base64.StdEncoding.DecodeString(keyStr)
	if err == nil && len(decoded) == 32 {
		return decoded, nil
	}

	return nil, domain.ErrInvalidEncryptionKey
}

// SaveResume handles POST /api/v1/resumes
func (h *ResumeHandler) SaveResume(c *gin.Context) {
	userIDVal, exists := c.Get(middleware.ContextUserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID := userIDVal.(string)

	var req SaveResumeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	keyStr := req.SecretKey
	if keyStr == "" {
		keyStr = c.GetHeader("X-Secret-Key")
	}

	secretKey, err := parseSecretKey(keyStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid secret key: %v", err)})
		return
	}

	resume, err := h.resumeUseCase.SaveResume(
		c.Request.Context(),
		userID,
		req.Title,
		req.RawJSON,
		secretKey,
	)
	if err != nil {
		if errors.Is(err, domain.ErrInvalidEncryptionKey) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "secret key must resolve to 32 bytes (raw string, 64-char hex, or base64)"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to encrypt and save resume"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "resume encrypted and saved successfully",
		"resume": gin.H{
			"id":         resume.ID,
			"user_id":    resume.UserID,
			"title":      resume.Title,
			"created_at": resume.CreatedAt,
			"updated_at": resume.UpdatedAt,
		},
	})
}

// GetResume handles GET /api/v1/resumes/:id
func (h *ResumeHandler) GetResume(c *gin.Context) {
	userIDVal, exists := c.Get(middleware.ContextUserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID := userIDVal.(string)

	resumeID := c.Param("id")
	if resumeID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resume id parameter is required"})
		return
	}

	keyStr := c.GetHeader("X-Secret-Key")
	if keyStr == "" {
		keyStr = c.Query("secret_key")
	}

	secretKey, err := parseSecretKey(keyStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid secret key: %v", err)})
		return
	}

	payload, err := h.resumeUseCase.GetResume(
		c.Request.Context(),
		resumeID,
		userID,
		secretKey,
	)
	if err != nil {
		if errors.Is(err, domain.ErrResumeNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "resume not found"})
			return
		}
		if errors.Is(err, domain.ErrUnauthorizedAccess) {
			c.JSON(http.StatusForbidden, gin.H{"error": "unauthorized access to resume"})
			return
		}
		if errors.Is(err, domain.ErrDecryptionFailed) {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "failed to decrypt resume payload: invalid key or corrupted data"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve resume"})
		return
	}

	var rawJSONObj interface{}
	if jsonErr := json.Unmarshal(payload.RawJSON, &rawJSONObj); jsonErr == nil {
		c.JSON(http.StatusOK, gin.H{
			"id":         payload.ID,
			"user_id":    payload.UserID,
			"title":      payload.Title,
			"data":       rawJSONObj,
			"created_at": payload.CreatedAt,
			"updated_at": payload.UpdatedAt,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"id":         payload.ID,
			"user_id":    payload.UserID,
			"title":      payload.Title,
			"data":       string(payload.RawJSON),
			"created_at": payload.CreatedAt,
			"updated_at": payload.UpdatedAt,
		})
	}
}

// ListResumes handles GET /api/v1/resumes
func (h *ResumeHandler) ListResumes(c *gin.Context) {
	userIDVal, exists := c.Get(middleware.ContextUserIDKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID := userIDVal.(string)

	resumes, err := h.resumeUseCase.ListUserResumes(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list user resumes"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"resumes": resumes,
	})
}
