package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tomssojer/cms/initialize"
	"github.com/tomssojer/cms/types"
)

// Get all components
func GetComponents(c *gin.Context) {

	var components []types.Component
	initialize.DB.Find(&components)

	c.IndentedJSON(http.StatusOK, components)
}

// Get component by id
func GetComponentById(c *gin.Context) {
	id := c.Param("id")

	var component types.Component
	initialize.DB.First(&component, id)

	c.IndentedJSON(http.StatusOK, component)
}

// Post a new component
func PostComponent(c *gin.Context) {

	var properties struct {
		Used    bool
		Content string
	}

	c.Bind(&properties)

	newComponent := types.Component{Used: properties.Used, Content: properties.Content}
	component := initialize.DB.Create(&newComponent)

	if component.Error != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "post not working"})
		return
	}

	c.IndentedJSON(http.StatusCreated, newComponent)
}

// Change an existing component
func PutComponent(c *gin.Context) {

	var properties struct {
		Used    bool
		Content string
	}

	c.Bind(&properties)

	id := c.Param("id")

	var changedComponent types.Component
	initialize.DB.First(&changedComponent, id)

	initialize.DB.Model(&changedComponent).Updates(types.Component{
		Used: properties.Used, Content: properties.Content,
	})

	c.IndentedJSON(http.StatusAccepted, changedComponent)
}

// Delete a component
func DeleteComponent(c *gin.Context) {

	id := c.Param("id")

	var component types.Component
	initialize.DB.Delete(&component, id)

	c.IndentedJSON(http.StatusOK, gin.H{"message": "successfully deleted"})
}
