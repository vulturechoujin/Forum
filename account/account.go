package account

import (
	"fmt"
	"forum/backend/custom_error"
	dbconnect "forum/backend/dbconnect"
	myTypes "forum/backend/myTypes"
	"forum/backend/session"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func CheckPassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
func AddUsers(ct *gin.Context) {
	// fmt.Println(ct.Request.Method)
	var newUser myTypes.User
	if err := ct.BindJSON(&newUser); err != nil {
		_ = ct.Error(err)
		return
	} else {
		cnt, err := dbconnect.CountUser(newUser)
		if err != nil {
			ct.Error(err)
		}
		if cnt == 0 {
			err2 := dbconnect.NewUser(newUser)
			ct.JSON(http.StatusAccepted, gin.H{
				"message": "Create successfully, return to login",
			})
			if err2 != nil {
				ct.Error(err2)
			}
		} else {
			_ = ct.Error(&custom_error.UserError{
				StatusCode: http.StatusBadRequest,
				Type:       "INVALID_ACCOUNT",
				Message:    "Username already exists, please login",
			})
			return
		}
		tokenString, err3 := session.CreateToken(newUser.Username)
		if err3 != nil {
			_ = ct.Error(err3)
			return
		}
		ct.SetCookie("token", tokenString, 3600, "/", "localhost", false, true)
	}
}

func VerifyUsers(ct *gin.Context) {
	var Credentials myTypes.User
	if err := ct.BindJSON(&Credentials); err != nil {
		_ = ct.Error(err)
		return
	}
	fmt.Println(Credentials.Username)
	username, password, err2 := dbconnect.FindUser(Credentials)
	if err2 != nil {
		_ = ct.Error(err2)
		return
	}
	if username == "" {
		fmt.Println("????????")
		// _ = ct.Error()
		return
	}
	if username == Credentials.Username && CheckPassword(password, Credentials.Password) {
		tokenString, err3 := session.CreateToken(username)
		if err3 != nil {
			_ = ct.Error(err2)
			return
		}
		fmt.Printf("%s\n", tokenString)
		ct.SetCookie("token", tokenString, 3600, "/", "localhost", false, true)
		ct.JSON(http.StatusAccepted, gin.H{
			"message": "Login Successfully",
		})
	} else {
		_ = ct.Error(&custom_error.UserError{
			StatusCode: http.StatusBadRequest,
			Type:       "INVALID_CREDENTIALS",
			Message:    "Wrong username or password",
		})
	}
}

func LogOut(ct *gin.Context) {
	ct.SetCookie("token", "", -1, "/", "localhost", false, true)
}
