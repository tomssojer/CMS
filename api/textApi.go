package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tomssojer/cms/initialize"
	"github.com/tomssojer/cms/types"
)

// Get all text components
func GetText(c *gin.Context) {

	var components []types.Text
	initialize.DB.Find(&components)

	c.IndentedJSON(http.StatusOK, components)
}

// Get text by id
func GetTextById(c *gin.Context) {
	id := c.Param("id")

	var component types.Text
	initialize.DB.First(&component, id)

	c.IndentedJSON(http.StatusOK, component)
}

// Post a new text component
func PostText(c *gin.Context) {

	var properties types.BasicText

	if err := c.Bind(&properties); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"bind error": err.Error()})
		return
	}

	newComponent := types.Text{
		Used:    properties.Used,
		Name:    properties.Name,
		Content: properties.Content,
	}

	component := initialize.DB.Create(&newComponent)

	if component.Error != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "post not working"})
		return
	}

	c.IndentedJSON(http.StatusCreated, newComponent)
}

// Change an existing text
func PutText(c *gin.Context) {

	var properties types.BasicText

	if err := c.Bind(&properties); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")

	var changedComponent types.Text
	initialize.DB.First(&changedComponent, id)

	initialize.DB.Model(&changedComponent).Updates(types.Text{
		Used:    properties.Used,
		Name:    properties.Name,
		Content: properties.Content,
	})

	c.IndentedJSON(http.StatusAccepted, changedComponent)
}

// Delete a text component
func DeleteText(c *gin.Context) {

	id := c.Param("id")

	var component types.Text
	initialize.DB.Delete(&component, id)

	c.IndentedJSON(http.StatusOK, gin.H{"message": "successfully deleted"})
}
