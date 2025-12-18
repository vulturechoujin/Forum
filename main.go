package main

import (
	"fmt"
	dbconnect "forum/backend/dbconnect"
	myTypes "forum/backend/myTypes"
	"net/http"

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

func responseStr(myUser myTypes.User) string {
	ans := ""
	cntUser := dbconnect.FindUser(myUser)
	fmt.Println(cntUser)
	if cntUser >= 1 {
		ans = "Already existed"
	} else if cntUser == 0 {
		ans = "Successfully creating"
	} else {
		ans = "Error, try again"
	}
	return ans
}

func addUsers(ct *gin.Context) {
	// fmt.Println(ct.Request.Method)
	var newUser myTypes.User
	response := ""
	if err := ct.BindJSON(&newUser); err != nil {
		response = "Error , try again"
		return
	} else {
		fmt.Println(newUser)
		response = responseStr(newUser)
		if response == "Successfully creating" {
			dbconnect.UpdateDatabase(newUser)
		}
	}
	ct.JSON(http.StatusOK, response)
}

func main() {
	dbconnect.DBconnect()
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.SetTrustedProxies([]string{"127.0.0.1:8000"})
	router.POST("/users", addUsers)
	router.Run("localhost:8000")
}
