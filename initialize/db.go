package initialize

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DBConnect() {
	var err error

	dsn := os.Getenv("DB_CONN_STR")
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect")
	} else {
		log.Print("Connected to DB")
	}
}
