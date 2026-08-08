package password_test

import (
	"testing"

	"github.com/AbolHoul01/Muraqqa/apps/api/pkg/password"
)

func TestPasswordHashing(t *testing.T) {
	rawPassword := "SecureP@ssw0rd!"

	hash, err := password.HashPassword(rawPassword)
	if err != nil {
		t.Fatalf("unexpected error hashing password: %v", err)
	}

	if hash == rawPassword {
		t.Fatal("password hash must not equal raw password")
	}

	if !password.CheckPasswordHash(rawPassword, hash) {
		t.Fatal("expected password check to succeed for correct password")
	}

	if password.CheckPasswordHash("WrongPassword!", hash) {
		t.Fatal("expected password check to fail for incorrect password")
	}
}
