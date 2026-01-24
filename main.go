package main

import (
	// "errors"

	// "time"

	caching "forum/backend/Caching"
	"forum/backend/account"
	"forum/backend/custom_error"
	dbconnect "forum/backend/dbconnect"
	"log"
	"net/http"
	"os"
	"time"

	"forum/backend/discussion"
	"forum/backend/reply"
	"forum/backend/session"

	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		CLIENT_URL := os.Getenv("CLIENT_URL")
		if CLIENT_URL == "" {
			CLIENT_URL = "http://localhost:3000"
		}
		c.Writer.Header().Set("Content-Type", "application/json")
		c.Writer.Header().Set("Access-Control-Allow-Origin", CLIENT_URL)
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
	sentry.Init(sentry.ClientOptions{
		Dsn:   "https://dbc95b7dfbdb437bbb09ad650f0c23c1@app.glitchtip.com/19317",
		Debug: true,
	})
	if err := dbconnect.RunMigrations(); err != nil {
		log.Fatalf("Failed to run migration %v", err)
	}
	log.Println("Application started")
	dbconnect.DBconnect()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.Use(sentrygin.New(sentrygin.Options{
		Repanic:         true,
		WaitForDelivery: false,
		Timeout:         5 * time.Second,
	}))
	router.Use(caching.HttpEtagCache(3600))
	router.Use(custom_error.ErrorHandler())
	router.SetTrustedProxies([]string{"127.0.0.1:" + port})
	router.GET("/", func(ct *gin.Context) {
		ct.JSON(http.StatusAccepted, "something")
	})
	//Cookies
	router.POST("/users", account.AddUsers)
	router.POST("/login", account.VerifyUsers)
	router.POST("/cookies", session.AuthenticateMiddleware)
	//Post
	router.GET("/getpost/:post_id", discussion.GetPost)
	router.GET("/discussion", discussion.ReturnPosts)
	router.POST("/createpost", discussion.AddPosts)
	router.POST("/likepost", discussion.IncrementLike)
	router.POST("/logout", account.LogOut)
	//Reply
	router.POST("/createreply", reply.AddReplies)
	router.GET("/getreplies/:post_id", reply.ReturnReplies)
	router.POST("/likereply", reply.IncrementLike)
	router.Run(":" + port)
}
