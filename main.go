package main

import (
	"github.com/gin-contrib/cors"
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

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	corsConfig.AddAllowMethods("GET")
	router.Use(cors.New(corsConfig))

	text := router.Group("/api/text")
	{
		text.GET("", api.GetText)
		text.GET(":id", api.GetTextById)
		text.POST("", api.PostText)
		text.PUT(":id", api.PutText)
		text.DELETE(":id", api.DeleteText)
	}
	image := router.Group("/api/images")
	{
		image.GET("", api.GetImages)
		image.GET(":id", api.GetImageById)
		image.POST("", api.PostImage)
		image.PUT(":id", api.PutImage)
		image.DELETE(":id", api.DeleteImage)
	}

	router.Run()
}
