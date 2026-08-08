# Build Stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install SSL certificates and build tools
RUN apk add --no-cache git ca-certificates

# Copy module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build optimized static Go binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/muraqqa-api ./cmd/api

# Runner Stage
FROM alpine:latest AS runner

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata

# Create non-root user for security
RUN addgroup -S muraqqa && adduser -S muraqqa -G muraqqa

COPY --from=builder /app/muraqqa-api /app/muraqqa-api
COPY --from=builder /app/migrations /app/migrations

USER muraqqa

EXPOSE 8080

CMD ["/app/muraqqa-api"]
