package discussion

import (
	"fmt"
	dbconnect "forum/backend/dbconnect"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ReturnPosts(ct *gin.Context) {
	posts, error := dbconnect.ReturnPosts()
	if error != nil {
		fmt.Println(error)
	}
	ct.JSON(http.StatusOK, posts)
}

func AddPosts(ct *gin.Context) {
	// fmt.Println(ct.Request.Method)
	var newContent string
	response := ""
	if err := ct.BindJSON(&newContent); err != nil {
		response = "Error , try again"
		return
	} else {
		response = "Succesfully posting"
		dbconnect.NewPost(newContent)
	}
	fmt.Println(response)
	ct.JSON(http.StatusOK, response)
}
