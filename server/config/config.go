package config

import (
	"flag"
)

type ConfigurationStruct struct {
	BrvsURL string
}

var Configuration ConfigurationStruct

func LoadConfig() {
	BRVS := flag.String("BRVS-URL", "http://localhost:8080", "The IP address of BRVS service")

	flag.Parse()

	Configuration.BrvsURL = *BRVS
}
