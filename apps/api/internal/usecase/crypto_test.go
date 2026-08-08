package usecase_test

import (
	"bytes"
	"errors"
	"testing"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/domain"
	"github.com/AbolHoul01/Muraqqa/apps/api/internal/usecase"
)

func TestAESCrypto_EncryptDecrypt(t *testing.T) {
	crypto := usecase.NewAESCryptoService()

	key, err := crypto.GenerateKey()
	if err != nil {
		t.Fatalf("unexpected error generating key: %v", err)
	}

	if len(key) != usecase.KeySize {
		t.Fatalf("expected key length %d, got %d", usecase.KeySize, len(key))
	}

	originalPayload := []byte(`{"personalInfo":{"fullName":"John Doe","email":"john@example.com"}}`)

	encrypted, err := crypto.Encrypt(originalPayload, key)
	if err != nil {
		t.Fatalf("unexpected error during encryption: %v", err)
	}

	if bytes.Equal(originalPayload, encrypted) {
		t.Fatal("encrypted payload must not match original plaintext")
	}

	decrypted, err := crypto.Decrypt(encrypted, key)
	if err != nil {
		t.Fatalf("unexpected error during decryption: %v", err)
	}

	if !bytes.Equal(originalPayload, decrypted) {
		t.Fatalf("expected %s, got %s", string(originalPayload), string(decrypted))
	}
}

func TestAESCrypto_InvalidKeyLength(t *testing.T) {
	crypto := usecase.NewAESCryptoService()
	shortKey := []byte("short-16-byte-key")

	payload := []byte("secret data")

	_, err := crypto.Encrypt(payload, shortKey)
	if !errors.Is(err, domain.ErrInvalidEncryptionKey) {
		t.Fatalf("expected ErrInvalidEncryptionKey on Encrypt, got %v", err)
	}

	_, err = crypto.Decrypt(payload, shortKey)
	if !errors.Is(err, domain.ErrInvalidEncryptionKey) {
		t.Fatalf("expected ErrInvalidEncryptionKey on Decrypt, got %v", err)
	}
}

func TestAESCrypto_WrongKey(t *testing.T) {
	crypto := usecase.NewAESCryptoService()

	key1, _ := crypto.GenerateKey()
	key2, _ := crypto.GenerateKey()

	payload := []byte("sensitive resume JSON")

	encrypted, err := crypto.Encrypt(payload, key1)
	if err != nil {
		t.Fatalf("unexpected error encrypting: %v", err)
	}

	_, err = crypto.Decrypt(encrypted, key2)
	if !errors.Is(err, domain.ErrDecryptionFailed) {
		t.Fatalf("expected ErrDecryptionFailed when decrypting with wrong key, got %v", err)
	}
}

func TestAESCrypto_CorruptedCiphertext(t *testing.T) {
	crypto := usecase.NewAESCryptoService()

	key, _ := crypto.GenerateKey()
	payload := []byte("sensitive resume JSON")

	encrypted, err := crypto.Encrypt(payload, key)
	if err != nil {
		t.Fatalf("unexpected error encrypting: %v", err)
	}

	// Corrupt a byte in ciphertext payload
	encrypted[len(encrypted)-1] ^= 0xFF

	_, err = crypto.Decrypt(encrypted, key)
	if !errors.Is(err, domain.ErrDecryptionFailed) {
		t.Fatalf("expected ErrDecryptionFailed on corrupted payload, got %v", err)
	}
}

func TestAESCrypto_ShortCiphertext(t *testing.T) {
	crypto := usecase.NewAESCryptoService()
	key, _ := crypto.GenerateKey()

	shortCiphertext := []byte("too-short")
	_, err := crypto.Decrypt(shortCiphertext, key)
	if !errors.Is(err, domain.ErrDecryptionFailed) {
		t.Fatalf("expected ErrDecryptionFailed on short ciphertext, got %v", err)
	}
}
