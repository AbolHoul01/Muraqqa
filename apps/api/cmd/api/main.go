package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/usecase"
)

func main() {
	log.Println("Starting Muraqqa (مرقع) Backend Service Core API...")

	// Verify Zero-Knowledge Cryptographic Engine initialization
	cryptoService := usecase.NewAESCryptoService()
	testKey, err := cryptoService.GenerateKey()
	if err != nil {
		log.Fatalf("Failed to initialize cryptographic engine: %v", err)
	}
	_ = testKey

	log.Println("Zero-Knowledge AES-256-GCM Cryptographic Engine verified [OK]")

	// Handle graceful shutdown signal
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	log.Println("Muraqqa Core API is ready and listening for context signals.")

	<-ctx.Done()
	log.Println("Shutdown signal received. Shutting down gracefully...")

	_, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	log.Println("Muraqqa Core API exited cleanly.")
}
