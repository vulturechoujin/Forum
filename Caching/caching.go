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

// Override WriteHeader so the inner handler (ct.JSON)
// doesn't actually send the 200 OK yet.
func (w *responseBodyWriter) WriteHeader(code int) {
	// Do nothing here! We will call the REAL WriteHeader in the middleware.
}

func (w *responseBodyWriter) Write(b []byte) (int, error) {
	return w.body.Write(b)
}

func HttpEtagCache(maxAge uint) gin.HandlerFunc {
	return func(ct *gin.Context) {
		originalWriter := ct.Writer
		w := &responseBodyWriter{
			ResponseWriter: originalWriter,
			body:           &bytes.Buffer{},
		}
		ct.Writer = w

		ct.Next()

		etag := fmt.Sprintf(`W/"%x"`, sha1.Sum(w.body.Bytes()))

		if ct.GetHeader("If-None-Match") == etag {
			originalWriter.WriteHeader(http.StatusNotModified)
			return
		}
		// If no match, set headers and write the actual 200 status + body
		ct.Header("ETag", etag)
		ct.Header("Cache-Control", fmt.Sprintf("public, max-age=%d", maxAge))
		originalWriter.WriteHeader(ct.Writer.Status())
		originalWriter.Write(w.body.Bytes())
	}
}
