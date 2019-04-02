package main

import (
	"log"
	"net/http"
	"strings"

	config "brvs-client/server/config"
	"brvs-client/server/handlers"

	"github.com/gorilla/mux"
)

const (
	staticDir = "/server/static/"
	port      = "8000"
)

type neuteredFileSystem struct {
	fs http.FileSystem
}

func (nfs neuteredFileSystem) Open(path string) (http.File, error) {
	f, err := nfs.fs.Open(path)
	if err != nil {
		return nil, err
	}

	s, err := f.Stat()
	if s.IsDir() {
		index := strings.TrimSuffix(path, "/") + "/index.html"
		if _, err := nfs.fs.Open(index); err != nil {
			return nil, err
		}
	}

	return f, nil
}

// NewRouter for handling routes and static files
func NewRouter() *mux.Router {
	router := mux.NewRouter()
	router.
		HandleFunc("/api/login", handlers.PostLogin).
		Methods("POST")

	router.
		HandleFunc("/api/transactions", handlers.GetBRVSTransactions).
		Methods("GET")

	router.
		PathPrefix("/").
		Handler(http.FileServer(neuteredFileSystem{http.Dir("." + staticDir)}))
	return router
}

// main function to boot up everything
func main() {
	config.LoadConfig()

	router := NewRouter()
	middleware := handlers.AuthMiddleware(router)
	cors := handlers.CorsMiddleware(middleware)

	err := http.ListenAndServe(":"+port, cors)
	if err != nil {
		log.Fatal("Server error:", err)
	}
}
