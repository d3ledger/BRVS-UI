package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/pobepto/brvs-client/server/handlers"
)

const (
	staticDir = "/server/static/"
	port      = "8000"
)

// NewRouter for static files
func NewRouter() *mux.Router {
	router := mux.NewRouter()
	router.
		HandleFunc("/api/login", handlers.PostLogin).
		Methods("POST")

	router.
		PathPrefix("/").
		Handler(http.FileServer(http.Dir("." + staticDir)))
	return router
}

// main function to boot up everything
func main() {
	router := NewRouter()
	middleware := handlers.AuthMiddleware(router)
	cors := handlers.CorsMiddleware(middleware)

	err := http.ListenAndServe(":"+port, cors)
	if err != nil {
		log.Fatal("Server error:", err)
	}
}
