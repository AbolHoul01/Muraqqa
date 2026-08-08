package usecase

import (
	"context"
	"fmt"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/domain"
)

type resumeUseCase struct {
	resumeRepo    domain.ResumeRepository
	cryptoService CryptoService
}

// NewResumeUseCase constructs a new ResumeUseCase implementation.
func NewResumeUseCase(resumeRepo domain.ResumeRepository, cryptoService CryptoService) domain.ResumeUseCase {
	return &resumeUseCase{
		resumeRepo:    resumeRepo,
		cryptoService: cryptoService,
	}
}

func (uc *resumeUseCase) SaveResume(
	ctx context.Context,
	userID string,
	title string,
	rawJSON []byte,
	key []byte,
) (*domain.Resume, error) {
	if userID == "" || len(rawJSON) == 0 {
		return nil, domain.ErrInvalidResumeData
	}
	if title == "" {
		title = "Untitled Resume"
	}

	encryptedData, err := uc.cryptoService.Encrypt(rawJSON, key)
	if err != nil {
		return nil, fmt.Errorf("failed to encrypt resume payload: %w", err)
	}

	resume := &domain.Resume{
		UserID:        userID,
		Title:         title,
		EncryptedData: encryptedData,
	}

	if err := uc.resumeRepo.Create(ctx, resume); err != nil {
		return nil, fmt.Errorf("failed to save encrypted resume: %w", err)
	}

	return resume, nil
}

func (uc *resumeUseCase) GetResume(
	ctx context.Context,
	resumeID string,
	userID string,
	key []byte,
) (*domain.ResumePayload, error) {
	resume, err := uc.resumeRepo.GetByID(ctx, resumeID)
	if err != nil {
		return nil, err
	}

	if resume.UserID != userID {
		return nil, domain.ErrUnauthorizedAccess
	}

	rawJSON, err := uc.cryptoService.Decrypt(resume.EncryptedData, key)
	if err != nil {
		return nil, err
	}

	payload := &domain.ResumePayload{
		ID:        resume.ID,
		UserID:    resume.UserID,
		Title:     resume.Title,
		RawJSON:   rawJSON,
		CreatedAt: resume.CreatedAt,
		UpdatedAt: resume.UpdatedAt,
	}

	return payload, nil
}

func (uc *resumeUseCase) ListUserResumes(ctx context.Context, userID string) ([]*domain.Resume, error) {
	if userID == "" {
		return nil, domain.ErrUnauthorizedAccess
	}
	return uc.resumeRepo.GetByUserID(ctx, userID)
}

func (uc *resumeUseCase) DeleteResume(ctx context.Context, resumeID string, userID string) error {
	if userID == "" || resumeID == "" {
		return domain.ErrInvalidResumeData
	}
	return uc.resumeRepo.Delete(ctx, resumeID, userID)
}
