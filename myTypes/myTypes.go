package myTypes

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type Post struct{
	Post_Id int
	Post_Content string
}
