package http

import (
	"net/http"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/delivery/http/handler"
	"github.com/AbolHoul01/Muraqqa/apps/api/internal/delivery/http/middleware"
	"github.com/AbolHoul01/Muraqqa/apps/api/pkg/jwt"
	"github.com/gin-gonic/gin"
)

type RouterConfig struct {
	AuthHandler   *handler.AuthHandler
	ResumeHandler *handler.ResumeHandler
	JWTManager    jwt.JWTManager
}

// SetupRouter initializes Gin engine with CORS, recovery, logging, and API route groups.
func SetupRouter(cfg RouterConfig) *gin.Engine {
	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// CORS middleware configuration
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, X-Secret-Key")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	// Health Check Endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "Muraqqa Core API",
		})
	})

	api := r.Group("/api/v1")
	{
		// Public Auth Endpoints
		authGroup := api.Group("/auth")
		{
			authGroup.POST("/register", cfg.AuthHandler.Register)
			authGroup.POST("/login", cfg.AuthHandler.Login)
		}

		// Protected Resume Endpoints
		protectedResumes := api.Group("/resumes")
		protectedResumes.Use(middleware.AuthMiddleware(cfg.JWTManager))
		{
			protectedResumes.POST("", cfg.ResumeHandler.SaveResume)
			protectedResumes.GET("", cfg.ResumeHandler.ListResumes)
			protectedResumes.GET("/:id", cfg.ResumeHandler.GetResume)
		}
	}

	return r
}
