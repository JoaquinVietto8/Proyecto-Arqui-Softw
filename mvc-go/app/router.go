package app

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

var (
	router *gin.Engine
)

func init() {
	router = gin.Default() //configura router por defecto
}

func StartRoute() {
	mapUrls() //mapeo de las url

	log.Info("Starting server")
	router.Run(":8080")

}
