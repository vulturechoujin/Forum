package account

import (
	"fmt"
	dbconnect "forum/backend/dbconnect"
	myTypes "forum/backend/myTypes"
	"forum/backend/session"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ResponseStr(myUser myTypes.User) string {
	ans := ""
	cntUser := dbconnect.CountUser(myUser)
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

func VerifyUsers(ct *gin.Context) {
	var Credentials myTypes.User
	if err := ct.BindJSON(&Credentials); err != nil {
		ct.String(http.StatusUnauthorized, "error")
		return
	}
	id, username, password := dbconnect.FindUser(Credentials)
	if username == "" || id == -1 {
		ct.String(http.StatusUnauthorized, "Username not existed")
		return
	}
	if username == Credentials.Username && password == Credentials.Password {
		tokenString, err := session.CreateToken(username)
		if err != nil {
			ct.String(http.StatusInternalServerError, "Error creating token")
			return
		}
		fmt.Printf("%s\n", tokenString)
		ct.SetCookie("token", tokenString, 3600, "/discussion", "localhost", false, true)
		ct.String(http.StatusAccepted, "Ok")
	} else {
		ct.String(http.StatusUnauthorized, "Invalid credentials")
	}
}
