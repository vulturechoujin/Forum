package custom_error

import (
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserError struct {
	StatusCode int
	Type       string
	Message    string
}

func (e *UserError) Error() string {
	return e.Message
}
func ErrorHandler() gin.HandlerFunc {
	return func(ct *gin.Context) {
		ct.Next()
		if len(ct.Errors) > 0 {
			err := ct.Errors.Last()
			var UserError *UserError
			if errors.As(err.Err, &UserError) {
				ct.JSON(UserError.StatusCode, gin.H{
					"type":    UserError.Type,
					"message": UserError.Message,
				})
			} else {
				ct.JSON(http.StatusInternalServerError, gin.H{
					"error": "Internal server error",
				})
				log.Printf("Unhanded error: %s", err.Error())
			}
			ct.Abort()
		}
	}
}
