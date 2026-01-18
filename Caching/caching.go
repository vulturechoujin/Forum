package caching

import (
	"bytes"
	"crypto/sha1"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type responseBodyWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
}

func (w *responseBodyWriter) Write(b []byte) (int, error) {
	return w.body.Write(b)
}
func HttpEtagCache(maxAge uint) gin.HandlerFunc {
	return func(ct *gin.Context) {
		// wrap the original writer
		w := &responseBodyWriter{
			ResponseWriter: ct.Writer,
			body:           &bytes.Buffer{},
		}
		ct.Writer = w
		ct.Next()
		body := w.body.Bytes()
		h := sha1.New()
		etag := fmt.Sprintf(`W/"%x"`, h.Sum(nil))
		ct.Header("ETag", etag)
		ct.Header("Cache-Control", fmt.Sprintf("public, max-age=%d", maxAge))
		fmt.Println(etag)
		if match := ct.GetHeader("If-None-Match"); match != "" {
			if match == etag {
				ct.Status(http.StatusNotModified)
				return
			}
		}
		w.ResponseWriter.Write(body)
	}
}
