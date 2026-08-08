package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	deliveryHTTP "github.com/AbolHoul01/Muraqqa/apps/api/internal/delivery/http"
	"github.com/AbolHoul01/Muraqqa/apps/api/internal/delivery/http/handler"
	"github.com/AbolHoul01/Muraqqa/apps/api/internal/repository/postgres"
	"github.com/AbolHoul01/Muraqqa/apps/api/internal/usecase"
	"github.com/AbolHoul01/Muraqqa/apps/api/pkg/jwt"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return fallback
}

func main() {
	log.Println("Starting Muraqqa (مرقع) Backend Service Core API...")

	// Environment Configuration
	port := getEnv("PORT", "8080")
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "5432")
	dbUser := getEnv("DB_USER", "muraqqa_admin")
	dbPassword := getEnv("DB_PASSWORD", "secretpassword")
	dbName := getEnv("DB_NAME", "muraqqa_db")
	jwtSecret := getEnv("JWT_SECRET", "super-secret-muraqqa-jwt-signing-key-change-in-prod")

	// 1. Initialize Database Connection Pool (PostgreSQL with pgx driver)
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		dbUser, dbPassword, dbHost, dbPort, dbName)

	db, err := sql.Open("pgx", dsn)
	if err != nil {
		log.Fatalf("Failed to open database connection: %v", err)
	}
	defer db.Close()

	// Connection Pool Settings
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(15 * time.Minute)

	// Ping Database
	if err := db.Ping(); err != nil {
		log.Printf("Notice: Database connection attempt returned: %v (Continuing startup)", err)
	} else {
		log.Println("PostgreSQL Database Connection Established [OK]")
	}

	// 2. Initialize Repositories
	userRepo := postgres.NewUserRepository(db)
	resumeRepo := postgres.NewResumeRepository(db)

	// 3. Initialize Cryptographic & Security Managers
	cryptoService := usecase.NewAESCryptoService()
	jwtManager := jwt.NewJWTManager(jwtSecret, 24*time.Hour)

	// 4. Initialize UseCases
	authUseCase := usecase.NewAuthUseCase(userRepo, jwtManager)
	resumeUseCase := usecase.NewResumeUseCase(resumeRepo, cryptoService)

	// 5. Initialize Handlers & Router
	authHandler := handler.NewAuthHandler(authUseCase)
	resumeHandler := handler.NewResumeHandler(resumeUseCase)

	routerConfig := deliveryHTTP.RouterConfig{
		AuthHandler:   authHandler,
		ResumeHandler: resumeHandler,
		JWTManager:    jwtManager,
	}

	router := deliveryHTTP.SetupRouter(routerConfig)

	// 6. Configure HTTP Server
	server := &http.Server{
		Addr:         ":" + port,
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// 7. Start HTTP Server in background
	go func() {
		log.Printf("Muraqqa Core API Server listening on port :%s", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("HTTP server unexpected error: %v", err)
		}
	}()

	// Graceful Shutdown Handling
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	<-ctx.Done()
	log.Println("Shutdown signal received. Initiating graceful server shutdown...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("Server forced shutdown error: %v", err)
	}

	log.Println("Muraqqa Core API stopped cleanly.")
}
