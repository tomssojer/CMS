package main

import (
	"github.com/tomssojer/cms/initialize"
	"github.com/tomssojer/cms/types"
)

func init() {
	initialize.EnvironmentVariables()
	initialize.DBConnect()
}

func main() {
	initialize.DB.AutoMigrate(
		&types.Text{},
		&types.Image{})
}
