package config

import (
	"flag"
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

	Configuration.BrvsURL = *BRVS
	Configuration.Production = *PROD
}
