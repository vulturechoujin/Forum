package reply

import (
	"fmt"
	"forum/backend/dbconnect"
	"forum/backend/myTypes"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ReturnReplies(ct *gin.Context) {
	var id int
	if err1 := ct.BindJSON(&id); err1 != nil {
		ct.JSON(http.StatusBadRequest, gin.H{"error": "Error, please reload the page"})
		ct.Error(err1)
		return
	}
	posts, err2 := dbconnect.ReturnReplies(id)
	if err2 != nil {
		ct.Error(err2)
		ct.JSON(http.StatusBadRequest, gin.H{"error": "Error, please try reloading the page"})
		return
	}
	ct.JSON(http.StatusOK, posts)
}

func AddReplies(ct *gin.Context) {
	var newContent myTypes.Reply
	if err := ct.BindJSON(&newContent); err != nil {
		ct.Error(err)
		ct.JSON(http.StatusBadRequest, gin.H{
			"error": "Please try again",
		})
		return
	} else {
		fmt.Printf("%+v", newContent)
		dbconnect.NewReply(newContent)
		ct.JSON(http.StatusOK, gin.H{
			"message": "Complete",
		})
	}
}

func IncrementLike(ct *gin.Context) {
	var reply_id int
	if err := ct.BindJSON(&reply_id); err != nil {
		ct.Error(err)
		ct.JSON(http.StatusBadRequest, gin.H{
			"error": "Please try again",
		})
		return
	} else {
		fmt.Printf("%d", reply_id)
		dbconnect.IncrementReplyLike(reply_id)
		ct.JSON(http.StatusOK, gin.H{
			"message": "Complete",
		})
	}
}

// func GetReply(ct *gin.Context) {
// 	var id int
// 	if err := ct.BindJSON(&id); err != nil {
// 		ct.String(http.StatusBadRequest, "Error converting between type of variables")
// 		return
// 	} else {
// 		post, err := dbconnect.ReadPost(id)
// 		if err != nil {
// 			fmt.Printf("%+v", err)
// 			ct.String(http.StatusBadRequest, "Error on the server")
// 			return
// 		}
// 		if post.Post_Id == 0 {
// 			ct.JSON(http.StatusNotFound, "Don't exist")
// 		} else {
// 			ct.JSON(http.StatusAccepted, post)
// 		}
// 	}
// }
