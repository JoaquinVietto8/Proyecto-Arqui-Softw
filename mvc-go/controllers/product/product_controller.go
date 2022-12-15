package productController

import (
	"mvc-go/dto"
	service "mvc-go/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetProductsById(c *gin.Context) {

	log.Debug("Product id to load: " + c.Param("id_product"))
	id, _ := strconv.Atoi(c.Param("id_product"))

	var productDto dto.ProductDto
	productDto, err := service.ProductService.GetProductsById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, productDto)
}

func GetProductById(c *gin.Context) {

	log.Debug("Product id to load: " + c.Param("id_product"))
	id, _ := strconv.Atoi(c.Param("id_product"))

	var producstDto dto.ProductsDto
	producstDto, err := service.ProductService.GetProductById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, producstDto)
}

func GetProducts(c *gin.Context) {
	var productsDto dto.ProductsDto
	productsDto, err := service.ProductService.GetProducts()

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, productsDto)
}

func GetProductsByCategoryId(c *gin.Context) {

	log.Debug("Category to load: " + c.Param("id_category"))
	id, _ := strconv.Atoi(c.Param("id_category"))

	var productsDto dto.ProductsDto
	productsDto, err := service.ProductService.GetProductsByCategoryId(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, productsDto)
}

func GetProductsBySearch(c *gin.Context) {

	log.Debug("Product name to load: " + c.Param("search"))
	search := c.Param("search")

	var productsDto dto.ProductsDto
	productsDto, err := service.ProductService.GetProductsBySearch(search)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, productsDto)
}
