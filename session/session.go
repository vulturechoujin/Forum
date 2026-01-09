package session

import (
	"fmt"
	"forum/backend/custom_error"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("your-secret-key")

func CreateToken(username string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"sub": username,
			"iss": "forum",
			"exp": time.Now().Add(time.Hour).Unix(),
			"iat": time.Now().Unix(),
		})
	tokenString, err := claims.SignedString(secretKey)
	if err != nil {
		return "", err
	}
	// fmt.Printf("%+v\n", claims)
	return tokenString, nil
}
func VerifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})
	if err != nil {
		// fmt.Println("Error parsing token: ", err)
		return nil, err
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}
	return token, nil
}
func AuthenticateMiddleware(ct *gin.Context) {
	tokenString, err := ct.Cookie("token")
	fmt.Println(tokenString)
	if err != nil {
		fmt.Println("missing")
		ct.Error(&custom_error.UserError{
			StatusCode: http.StatusUnauthorized,
			Type:       "INVALID_COOKIES",
			Message:    "Not Login",
		})
		// ct.Redirect(http.StatusSeeOther, "/login")
		ct.Abort()
		return
	}
	token, err := VerifyToken(tokenString)
	if err != nil {
		fmt.Printf("%+v\n", err)
		ct.Error(err)
		// ct.Redirect(http.StatusSeeOther, "/login")
		ct.Abort()
		return
	}
	fmt.Println(token.Claims)
	username, err := token.Claims.GetSubject()
	ct.JSON(http.StatusOK, username)
}
