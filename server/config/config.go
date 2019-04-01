package config

import (
	"encoding/json"
	"os"
)

type ConfigurationStruct struct {
	BrvsURL string
}

var Configuration ConfigurationStruct

func LoadConfig() {
	file, err := os.Open("./server/config/config.json")
	if err != nil {
		return
	}

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&Configuration)
	if err != nil {
		return
	}
}
