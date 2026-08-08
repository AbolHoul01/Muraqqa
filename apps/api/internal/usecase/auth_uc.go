package usecase

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/domain"
	"github.com/AbolHoul01/Muraqqa/apps/api/pkg/jwt"
	"github.com/AbolHoul01/Muraqqa/apps/api/pkg/password"
)

// AuthUseCase defines authentication business logic operations.
type AuthUseCase interface {
	Register(ctx context.Context, email, rawPassword string) (*domain.User, error)
	Login(ctx context.Context, email, rawPassword string) (string, *domain.User, error)
}

type authUseCase struct {
	userRepo   domain.UserRepository
	jwtManager jwt.JWTManager
}

// NewAuthUseCase constructs a new AuthUseCase implementation.
func NewAuthUseCase(userRepo domain.UserRepository, jwtManager jwt.JWTManager) AuthUseCase {
	return &authUseCase{
		userRepo:   userRepo,
		jwtManager: jwtManager,
	}
}

func (uc *authUseCase) Register(ctx context.Context, email, rawPassword string) (*domain.User, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" || len(rawPassword) < 6 {
		return nil, domain.ErrInvalidUserData
	}

	hashedPassword, err := password.HashPassword(rawPassword)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	user := &domain.User{
		Email:        email,
		PasswordHash: hashedPassword,
	}

	if err := uc.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (uc *authUseCase) Login(ctx context.Context, email, rawPassword string) (string, *domain.User, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" || rawPassword == "" {
		return "", nil, domain.ErrInvalidCredentials
	}

	user, err := uc.userRepo.GetByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, domain.ErrUserNotFound) {
			return "", nil, domain.ErrInvalidCredentials
		}
		return "", nil, err
	}

	if !password.CheckPasswordHash(rawPassword, user.PasswordHash) {
		return "", nil, domain.ErrInvalidCredentials
	}

	token, err := uc.jwtManager.GenerateToken(user.ID, user.Email)
	if err != nil {
		return "", nil, fmt.Errorf("failed to generate auth token: %w", err)
	}

	return token, user, nil
}
