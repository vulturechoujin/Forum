package main

import (
	account "forum/backend/account"
	dbconnect "forum/backend/dbconnect"
	"forum/backend/discussion"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "application/json")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}

func main() {
	dbconnect.DBconnect()
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.SetTrustedProxies([]string{"127.0.0.1:8000"})
	router.POST("/users", account.AddUsers)
	router.POST("/createpost", discussion.AddPosts)
	router.GET("/discussion", discussion.ReturnPosts)
	router.Run("localhost:8000")
}
