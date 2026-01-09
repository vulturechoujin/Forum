package main

import (
	account "forum/backend/account"
	"forum/backend/custom_error"
	dbconnect "forum/backend/dbconnect"
	"forum/backend/discussion"
	"forum/backend/reply"
	"forum/backend/session"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "application/json")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max,X-Custom-Header")
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
	sentry.Init(sentry.ClientOptions{
		Dsn: "https://dbc95b7dfbdb437bbb09ad650f0c23c1@app.glitchtip.com/19317",
	})
	defer sentry.Flush(2 * time.Second)
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.Use(custom_error.ErrorHandler())
	router.SetTrustedProxies([]string{"127.0.0.1:8000"})
	// router.POST("/users", account.AddUsers)
	router.POST("/login", account.VerifyUsers)
	router.POST("/cookies", session.AuthenticateMiddleware)
	router.POST("/getposts", discussion.GetPost)
	router.GET("/discussion", discussion.ReturnPosts)
	router.POST("/createpost", discussion.AddPosts)

	router.POST("/logout", account.LogOut)

	router.POST("/createreply", reply.AddReplies)
	router.POST("/getreplies", reply.ReturnReplies)

	router.Run("localhost:8000")
}
