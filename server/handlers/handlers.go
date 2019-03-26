package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/Pobepto/brvs-client/server/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/thedevsaddam/govalidator"
)

var jwtKey = []byte("gOFGzrmqoD")

// AuthMiddleware should check requests for correct auth data
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/api/login" {
			next.ServeHTTP(w, r)
			return
		}
		if !strings.Contains(r.URL.Path, "api") {
			next.ServeHTTP(w, r)
			return
		}

		c, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		tknStr := c.Value
		claims := &models.Claims{}

		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		defer next.ServeHTTP(w, r)
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

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}
