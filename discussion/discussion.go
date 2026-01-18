package discussion

import (
	// "fmt"

	"forum/backend/dbconnect"
	"forum/backend/myTypes"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ReturnPosts(ct *gin.Context) {
	posts, err := dbconnect.ReturnPosts()
	if err != nil {
		ct.Error(err)
		return
	}
	ct.JSON(http.StatusAccepted, posts)
}

func AddPosts(ct *gin.Context) {
	// fmt.Println(ct.Request.Method)
	var newContent myTypes.Post
	if err := ct.BindJSON(&newContent); err != nil {
		ct.Error(err)
		return
	} else {
		dbconnect.NewPost(newContent)
	}
	ct.JSON(http.StatusOK, gin.H{"message": "Sucessfully creating"})
}

func GetPost(ct *gin.Context) {
	var id int
	if err := ct.BindJSON(&id); err != nil {
		ct.Error(err)
		return
	} else {
		post, err := dbconnect.ReadPost(id)
		if err != nil {
			ct.Error(err)
			return
		}
		ct.JSON(http.StatusAccepted, post)
	}
	// ct.JSON(http.StatusAccepted, "Hello")
}
