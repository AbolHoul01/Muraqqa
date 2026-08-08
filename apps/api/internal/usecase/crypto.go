package usecase

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"fmt"
	"io"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/domain"
)

// KeySize represents the required key length for AES-256 (32 bytes / 256 bits).
const KeySize = 32

// CryptoService provides AES-256-GCM symmetric encryption and decryption capabilities.
type CryptoService interface {
	Encrypt(plaintext []byte, key []byte) ([]byte, error)
	Decrypt(ciphertext []byte, key []byte) ([]byte, error)
	GenerateKey() ([]byte, error)
}

type aesCryptoService struct{}

// NewAESCryptoService constructs a new AES-256-GCM CryptoService implementation.
func NewAESCryptoService() CryptoService {
	return &aesCryptoService{}
}

// Encrypt encrypts raw plaintext using AES-256-GCM with a cryptographically secure random nonce.
// The output payload format is: [12-byte Nonce][Encrypted Ciphertext + 16-byte Auth Tag].
func (s *aesCryptoService) Encrypt(plaintext []byte, key []byte) ([]byte, error) {
	if len(key) != KeySize {
		return nil, domain.ErrInvalidEncryptionKey
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, fmt.Errorf("failed to create AES cipher: %w", err)
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, fmt.Errorf("failed to create GCM AEAD mode: %w", err)
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, fmt.Errorf("failed to generate random nonce: %w", err)
	}

	// gcm.Seal prepends nonce to the encrypted payload
	return gcm.Seal(nonce, nonce, plaintext, nil), nil
}

// Decrypt extracts the nonce prefix and decrypts AES-256-GCM encrypted payload.
// Returns domain.ErrDecryptionFailed if key is wrong or payload is corrupted.
func (s *aesCryptoService) Decrypt(ciphertext []byte, key []byte) ([]byte, error) {
	if len(key) != KeySize {
		return nil, domain.ErrInvalidEncryptionKey
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, fmt.Errorf("failed to create AES cipher: %w", err)
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, fmt.Errorf("failed to create GCM AEAD mode: %w", err)
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return nil, domain.ErrDecryptionFailed
	}

	nonce, encryptedPayload := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, encryptedPayload, nil)
	if err != nil {
		return nil, fmt.Errorf("%w: %v", domain.ErrDecryptionFailed, err)
	}

	return plaintext, nil
}

// GenerateKey helper returns a cryptographically secure 256-bit (32-byte) key.
func (s *aesCryptoService) GenerateKey() ([]byte, error) {
	key := make([]byte, KeySize)
	if _, err := io.ReadFull(rand.Reader, key); err != nil {
		return nil, fmt.Errorf("failed to generate 256-bit key: %w", err)
	}
	return key, nil
}
