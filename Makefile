test:
	go mod tidy
	go fmt ./...
	go test -v ./...