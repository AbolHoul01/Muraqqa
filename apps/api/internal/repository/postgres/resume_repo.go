package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/AbolHoul01/Muraqqa/apps/api/internal/domain"
	"github.com/google/uuid"
)

type resumeRepo struct {
	db *sql.DB
}

// NewResumeRepository returns a PostgreSQL implementation of domain.ResumeRepository.
func NewResumeRepository(db *sql.DB) domain.ResumeRepository {
	return &resumeRepo{db: db}
}

func (r *resumeRepo) Create(ctx context.Context, resume *domain.Resume) error {
	if resume.ID == "" {
		resume.ID = uuid.New().String()
	}
	now := time.Now().UTC()
	if resume.CreatedAt.IsZero() {
		resume.CreatedAt = now
	}
	resume.UpdatedAt = now

	query := `
		INSERT INTO encrypted_resumes (id, user_id, title, encrypted_data, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	_, err := r.db.ExecContext(
		ctx,
		query,
		resume.ID,
		resume.UserID,
		resume.Title,
		resume.EncryptedData,
		resume.CreatedAt,
		resume.UpdatedAt,
	)
	if err != nil {
		return fmt.Errorf("failed to insert encrypted resume: %w", err)
	}

	return nil
}

func (r *resumeRepo) GetByID(ctx context.Context, id string) (*domain.Resume, error) {
	query := `
		SELECT id, user_id, title, encrypted_data, created_at, updated_at
		FROM encrypted_resumes
		WHERE id = $1
	`

	var resume domain.Resume
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&resume.ID,
		&resume.UserID,
		&resume.Title,
		&resume.EncryptedData,
		&resume.CreatedAt,
		&resume.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, domain.ErrResumeNotFound
		}
		return nil, fmt.Errorf("failed to query resume by id: %w", err)
	}

	return &resume, nil
}

func (r *resumeRepo) GetByUserID(ctx context.Context, userID string) ([]*domain.Resume, error) {
	query := `
		SELECT id, user_id, title, encrypted_data, created_at, updated_at
		FROM encrypted_resumes
		WHERE user_id = $1
		ORDER BY updated_at DESC
	`

	rows, err := r.db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to query resumes for user: %w", err)
	}
	defer rows.Close()

	var resumes []*domain.Resume
	for rows.Next() {
		var resume domain.Resume
		err := rows.Scan(
			&resume.ID,
			&resume.UserID,
			&resume.Title,
			&resume.EncryptedData,
			&resume.CreatedAt,
			&resume.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan resume row: %w", err)
		}
		resumes = append(resumes, &resume)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error during resume rows iteration: %w", err)
	}

	return resumes, nil
}

func (r *resumeRepo) Update(ctx context.Context, resume *domain.Resume) error {
	resume.UpdatedAt = time.Now().UTC()
	query := `
		UPDATE encrypted_resumes
		SET title = $1, encrypted_data = $2, updated_at = $3
		WHERE id = $4 AND user_id = $5
	`

	res, err := r.db.ExecContext(ctx, query, resume.Title, resume.EncryptedData, resume.UpdatedAt, resume.ID, resume.UserID)
	if err != nil {
		return fmt.Errorf("failed to update encrypted resume: %w", err)
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to check rows affected: %w", err)
	}

	if rows == 0 {
		return domain.ErrResumeNotFound
	}

	return nil
}

func (r *resumeRepo) Delete(ctx context.Context, id string, userID string) error {
	query := `DELETE FROM encrypted_resumes WHERE id = $1 AND user_id = $2`

	res, err := r.db.ExecContext(ctx, query, id, userID)
	if err != nil {
		return fmt.Errorf("failed to delete encrypted resume: %w", err)
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to check rows affected: %w", err)
	}

	if rows == 0 {
		return domain.ErrResumeNotFound
	}

	return nil
}
