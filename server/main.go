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
		PathPrefix("/").
		Handler(http.FileServer(http.Dir("." + staticDir)))
	return router
}

// main function to boot up everything
func main() {
	router := NewRouter()
	router.HandleFunc("/api/login", handlers.PostLogin).Methods("POST")

	middleware := handlers.AuthMiddleware(router)

	err := http.ListenAndServe(":"+port, middleware)
	if err != nil {
		log.Fatal("Server error:", err)
	}
}
