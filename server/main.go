package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	config "github.com/pobepto/brvs-client/server/config"
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
		HandleFunc("/api/transactions", handlers.GetBRVSTransactions).
		Methods("GET")

	router.
		PathPrefix("/").
		Handler(http.FileServer(http.Dir("." + staticDir)))
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
