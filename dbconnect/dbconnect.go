package dbconnect

import (
	"context"
	"fmt"
	myTypes "forum/backend/myTypes"
	"os"

	"github.com/jackc/pgx/v5"
)

var global_conn *pgx.Conn

// This is data base connection function
func DBconnect() {
	conn, err := pgx.Connect(context.Background(),
		"postgres://postgres:vulturechoujin@localhost:5000/Forum")
	global_conn = conn
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	// defer conn.Close(context.Background())
	fmt.Println("Connected")
}
func CountUser(myUser myTypes.User) int {
	sql := `SELECT COUNT(user_id) AS cnt FROM users
	WHERE username = $1`
	var cnt int
	err := global_conn.QueryRow(context.Background(), sql, myUser.Username).Scan(&cnt)
	if err != nil {
		return -1 /// error has occured
	}
	return cnt
}
func FindUser(myUser myTypes.User) (int, string, string) {
	sql := `SELECT user_id,username,pass FROM users
	WHERE username = $1`
	var username, password string
	var id int
	err := global_conn.QueryRow(context.Background(), sql, myUser.Username).Scan(&id, &username, &password)
	if err != nil {
		return -1, "", "" /// error has occured
	}
	return id, username, password
}
func NewUser(newuser myTypes.User) error {
	sql := `INSERT INTO users (username,pass) 
	Values ($1,$2)
	RETURNING user_id`
	var id int
	err := global_conn.QueryRow(context.Background(), sql, newuser.Username, newuser.Password).Scan(&id)
	if err != nil {
		return fmt.Errorf("error creating task: %w", err)
	}
	// fmt.Printf("Success")
	fmt.Printf("Created task with ID %d\n", id)
	return nil
}
func ReturnPosts() ([]myTypes.Post, error) {
	sql := `SELECT post_id,post_content FROM posts`
	var blogs []myTypes.Post
	rows, err := global_conn.Query(context.Background(), sql)
	if err != nil {
		return nil, fmt.Errorf("error creating task: %w", err)
	}
	defer rows.Close()
	for rows.Next() {
		blog := myTypes.Post{}
		err := rows.Scan(&blog.Post_Id, &blog.Post_Content)
		if err != nil {
			return nil, fmt.Errorf("error scanning row: %w", err)
		}
		blogs = append(blogs, blog)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating task row :%w", err)
	}
	return blogs, nil
}

func NewPost(newContent string) error {
	sql := `INSERT INTO posts (post_content,user_id) 
	Values ($1,2)
	RETURNING post_id`
	var id int
	err := global_conn.QueryRow(context.Background(), sql, newContent).Scan(&id)
	if err != nil {
		return fmt.Errorf("error creating task: %w", err)
	}
	// fmt.Printf("Success")
	fmt.Printf("Created task with ID %d\n", id)
	return nil
}
