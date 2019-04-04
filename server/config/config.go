package config

import (
	"flag"
	"log"
)

type ConfigurationStruct struct {
	BrvsURL    string
	Production bool
}

var Configuration ConfigurationStruct

func LoadConfig() {
	BRVS := flag.String("brvs-url", "http://localhost:8080", "The IP address of BRVS service")
	PROD := flag.Bool("production", true, "Is server runned in production mode")

	flag.Parse()

	log.Println("### SERVER ENV ###")
	log.Printf("BRVS-URL: %s\n", *BRVS)
	log.Printf("PRODUCTION: %t\n", *PROD)

	Configuration.BrvsURL = *BRVS
	Configuration.Production = *PROD
}
