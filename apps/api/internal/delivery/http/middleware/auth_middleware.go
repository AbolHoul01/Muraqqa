package middleware

import (
	"net/http"
	"strings"

	"github.com/AbolHoul01/Muraqqa/apps/api/pkg/jwt"
	"github.com/gin-gonic/gin"
)

const (
	// AuthorizationHeader is the HTTP header key for bearer token authentication.
	AuthorizationHeader = "Authorization"
	// ContextUserIDKey is the key used to store authenticated user ID in Gin Context.
	ContextUserIDKey = "user_id"
	// ContextUserEmailKey is the key used to store authenticated user email in Gin Context.
	ContextUserEmailKey = "user_email"
)

// AuthMiddleware validates JWT Bearer tokens and attaches claims to Gin context.
func AuthMiddleware(jwtManager jwt.JWTManager) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader(AuthorizationHeader)
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "authorization header is required"})
			c.Abort()
			return
		}

		fields := strings.Fields(authHeader)
		if len(fields) != 2 || !strings.EqualFold(fields[0], "Bearer") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization header format. expected 'Bearer <token>'"})
			c.Abort()
			return
		}

		accessToken := fields[1]
		claims, err := jwtManager.ValidateToken(accessToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired authentication token"})
			c.Abort()
			return
		}

		c.Set(ContextUserIDKey, claims.UserID)
		c.Set(ContextUserEmailKey, claims.Email)
		c.Next()
	}
}
