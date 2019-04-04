package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	config "brvs-client/server/config"
	"brvs-client/server/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/thedevsaddam/govalidator"
)

var jwtKey = []byte("gOFGzrmqoD")

// AuthMiddleware should check requests for correct auth data
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)

		if r.URL.Path == "/api/login" {
			next.ServeHTTP(w, r)
			return
		}
		if !strings.Contains(r.URL.Path, "api") {
			next.ServeHTTP(w, r)
			return
		}

		authString := r.Header.Get("Authorization")
		tokenString := authString[7:len(authString)]

		if len(tokenString) == 0 {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		claims := &models.Claims{}

		tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// CorsMiddleware should allow to make cors requests
func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !config.Configuration.Production {
			if r.Method == "OPTIONS" {
				w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token, Authorization")
				w.Header().Set("Content-Type", "application/json")
				return
			}
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token, Authorization")
			w.Header().Set("Content-Type", "application/json")
			next.ServeHTTP(w, r)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// PostLogin method for auth users in system
func PostLogin(w http.ResponseWriter, r *http.Request) {
	var auth models.Auth
	rules := govalidator.MapData{
		"username": []string{"required"},
		"password": []string{"required"},
	}

	opts := govalidator.Options{
		Request: r,
		Data:    &auth,
		Rules:   rules,
	}

	v := govalidator.New(opts)
	e := v.ValidateJSON()

	if len(e) != 0 {
		err := map[string]interface{}{"validationError": e}
		w.Header().Set("Content-type", "applciation/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err)
		return
	}

	expectedPassword, ok := models.Users[auth.Username]

	if !ok || expectedPassword != auth.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &models.Claims{
		Username: auth.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(models.Token{Token: tokenString, Date: expirationTime})
}

// GetBRVSTransactions method for getting txs from brvs server
func GetBRVSTransactions(w http.ResponseWriter, r *http.Request) {
	res, err := http.Get(config.Configuration.BrvsURL + "/brvs/rest/transactions")

	if err != nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}
	defer res.Body.Close()

	var result map[string]interface{}

	if res.StatusCode != 200 {
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	json.NewDecoder(res.Body).Decode(&result)
	json.NewEncoder(w).Encode(result)
}
