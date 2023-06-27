package main

import (
	"github.com/gin-gonic/gin"
	"github.com/tomssojer/cms/api"
	"github.com/tomssojer/cms/initialize"
)

func init() {
	initialize.EnvironmentVariables()
	initialize.DBConnect()
}

func main() {

	router := gin.Default()

	comp := router.Group("/components")
	{
		comp.GET("", api.GetComponents)
		comp.GET(":id", api.GetComponentById)
		comp.POST("", api.PostComponent)
		comp.PUT(":id", api.PutComponent)
		comp.DELETE(":id", api.DeleteComponent)
	}

	router.Run()
}
