package postgres

import "strings"

// isUniqueViolation checks whether an error corresponds to PostgreSQL unique constraint violation (SQLState 23505).
func isUniqueViolation(err error) bool {
	if err == nil {
		return false
	}
	return strings.Contains(err.Error(), "23505") || strings.Contains(strings.ToLower(err.Error()), "unique constraint")
}
