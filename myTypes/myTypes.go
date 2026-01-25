package myTypes

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type Post struct {
	Post_Id       int    `db:"post_id"`
	Post_Username string `db:"post_username"`
	Post_Content  string `db:"post_content"`
	Post_Theme    string `db:"post_theme"`
	Post_Topic    string `db:"post_topic"`
	Num_Likes     int    `db:"num_likes"`
}
type Reply struct {
	Reply_Id       int    `db:"reply_id"`
	Post_Id        int    `db:"post_id"`
	Num_Likes      int    `db:"num_likes"`
	Reply_Content  string `db:"reply_content"`
	Reply_Username string `db:"reply_username"`
}
type LoginCredential struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Remember bool   `json:"remember"`
}
