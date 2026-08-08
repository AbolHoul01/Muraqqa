package jwt_test

import (
	"errors"
	"testing"
	"time"

	"github.com/AbolHoul01/Muraqqa/apps/api/pkg/jwt"
)

func TestJWTManager_GenerateAndValidate(t *testing.T) {
	secret := "super-secret-key-for-muraqqa"
	duration := 1 * time.Hour
	mgr := jwt.NewJWTManager(secret, duration)

	userID := "123e4567-e89b-12d3-a456-426614174000"
	email := "user@example.com"

	token, err := mgr.GenerateToken(userID, email)
	if err != nil {
		t.Fatalf("unexpected error generating token: %v", err)
	}

	claims, err := mgr.ValidateToken(token)
	if err != nil {
		t.Fatalf("unexpected error validating valid token: %v", err)
	}

	if claims.UserID != userID {
		t.Errorf("expected UserID %s, got %s", userID, claims.UserID)
	}
	if claims.Email != email {
		t.Errorf("expected Email %s, got %s", email, claims.Email)
	}
}

func TestJWTManager_InvalidToken(t *testing.T) {
	secret := "super-secret-key"
	mgr := jwt.NewJWTManager(secret, 1*time.Hour)

	wrongSecretMgr := jwt.NewJWTManager("different-secret-key", 1*time.Hour)
	token, _ := wrongSecretMgr.GenerateToken("user-1", "user@example.com")

	_, err := mgr.ValidateToken(token)
	if !errors.Is(err, jwt.ErrInvalidToken) {
		t.Fatalf("expected ErrInvalidToken for token signed with different secret, got %v", err)
	}
}

func TestJWTManager_ExpiredToken(t *testing.T) {
	secret := "super-secret-key"
	// Generate token with negative duration so it's already expired
	mgr := jwt.NewJWTManager(secret, -1*time.Second)

	token, err := mgr.GenerateToken("user-1", "user@example.com")
	if err != nil {
		t.Fatalf("unexpected error generating expired token: %v", err)
	}

	_, err = mgr.ValidateToken(token)
	if !errors.Is(err, jwt.ErrInvalidToken) {
		t.Fatalf("expected ErrInvalidToken for expired token, got %v", err)
	}
}
