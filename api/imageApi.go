package api

import (
	"net/http"
	"path"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/tomssojer/cms/initialize"
	"github.com/tomssojer/cms/types"
)

// Get all images
func GetImages(c *gin.Context) {

	var components []types.Image
	initialize.DB.Find(&components)

	c.IndentedJSON(http.StatusOK, components)
}

// Get image by id
func GetImageById(c *gin.Context) {
	id := c.Param("id")

	var component types.Image
	initialize.DB.First(&component, id)

	c.IndentedJSON(http.StatusOK, component)
}

// Post a new image
func PostImage(c *gin.Context) {

	imageDir, err := filepath.Abs("images")
	if err != nil {
		panic(err)
	}

	image, err := c.FormFile("image")
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	imageName := filepath.Base(image.Filename)
	filePath := strings.ReplaceAll(path.Join(imageDir, imageName), " ", "_")

	var properties types.BasicImage

	if err := c.Bind(&properties); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"bind error": err.Error()})
		return
	}

	newComponent := types.Image{
		Used: properties.Used,
		Name: properties.Name,
		Url:  filePath,
	}

	component := initialize.DB.Create(&newComponent)
	if component.Error != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "post not working"})
		return
	}

	if err = c.SaveUploadedFile(image, filePath); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusCreated, newComponent)
}

// Change an existing image
func PutImage(c *gin.Context) {

	var properties types.BasicImage

	if err := c.Bind(&properties); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")

	var changedComponent types.Image
	initialize.DB.First(&changedComponent, id)

	initialize.DB.Model(&changedComponent).Updates(types.Image{
		Used: properties.Used,
		Name: properties.Name,
		Url:  properties.Url,
	})

	c.IndentedJSON(http.StatusAccepted, changedComponent)
}

// Delete an image
func DeleteImage(c *gin.Context) {

	id := c.Param("id")

	var component types.Image
	initialize.DB.Delete(&component, id)

	c.IndentedJSON(http.StatusOK, gin.H{"message": "successfully deleted"})
}
