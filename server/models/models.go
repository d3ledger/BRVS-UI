package models

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

// The person Type (more like an object)
type Auth struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Token struct {
	Token string    `json:"token"`
	Date  time.Time `json:"date"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

var Users = map[string]string{
	"admin": "Password!",
}
