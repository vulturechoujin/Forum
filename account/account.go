package account

import (
	"fmt"
	dbconnect "forum/backend/dbconnect"
	myTypes "forum/backend/myTypes"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ResponseStr(myUser myTypes.User) string {
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
func AddUsers(ct *gin.Context) {
	// fmt.Println(ct.Request.Method)
	var newUser myTypes.User
	response := ""
	if err := ct.BindJSON(&newUser); err != nil {
		response = "Error , try again"
		return
	} else {
		fmt.Println(newUser)
		response = ResponseStr(newUser)
		if response == "Successfully creating" {
			dbconnect.NewUser(newUser)
		}
	}
	ct.JSON(http.StatusOK, response)
}
