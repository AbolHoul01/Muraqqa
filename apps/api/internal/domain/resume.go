package domain

import (
	"context"
	"errors"
	"time"
)

// Domain sentinel errors for Resume domain operations.
var (
	ErrResumeNotFound       = errors.New("resume not found")
	ErrInvalidEncryptionKey = errors.New("invalid encryption key size: must be 32 bytes for AES-256")
	ErrUnauthorizedAccess   = errors.New("unauthorized access to resume")
	ErrInvalidResumeData    = errors.New("invalid resume data")
	ErrDecryptionFailed     = errors.New("failed to decrypt resume data: invalid key or corrupted payload")
)

// Resume represents an end-to-end encrypted resume entity stored in persistence.
type Resume struct {
	ID            string    `json:"id"`
	UserID        string    `json:"user_id"`
	Title         string    `json:"title"`
	EncryptedData []byte    `json:"-"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

// ResumeRepository defines the persistence contract for Resume entities.
type ResumeRepository interface {
	Create(ctx context.Context, resume *Resume) error
	GetByID(ctx context.Context, id string) (*Resume, error)
	GetByUserID(ctx context.Context, userID string) ([]*Resume, error)
	Update(ctx context.Context, resume *Resume) error
	Delete(ctx context.Context, id string, userID string) error
}

// ResumePayload represents the decrypted resume response payload returned to clients.
type ResumePayload struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	Title     string    `json:"title"`
	RawJSON   []byte    `json:"raw_json"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// ResumeUseCase defines the core business logic contract for encrypted resume management.
type ResumeUseCase interface {
	SaveResume(ctx context.Context, userID string, title string, rawJSON []byte, key []byte) (*Resume, error)
	GetResume(ctx context.Context, resumeID string, userID string, key []byte) (*ResumePayload, error)
	ListUserResumes(ctx context.Context, userID string) ([]*Resume, error)
	DeleteResume(ctx context.Context, resumeID string, userID string) error
}
