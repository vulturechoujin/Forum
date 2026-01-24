package dbconnect

import (
	"context"
	"fmt"
	"forum/backend/custom_error"
	myTypes "forum/backend/myTypes"
	"log"
	"net/http"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

var db *pgxpool.Pool

// This is data base connection function
func RunMigrations() error {
	DATABASE_URL := os.Getenv("DATABASE_URL")
	if DATABASE_URL == "" {
		DATABASE_URL = "postgresql://posgres:r6IYt6eBXh1FWSac5E9nvZFZZ4YPH0vY@dpg-d5mg8jbe5dus73egh6mg-a.singapore-postgres.render.com/forum_dh74?sslmode=require"
	}
	m, err := migrate.New(
		"file://./database/migrations", DATABASE_URL)
	if err != nil {
		return fmt.Errorf("Migration failed to ininitialize: %v", err)
	}
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("Failed to apply migrations: %v", err)
	}
	log.Println("Migrations applied succesfully")
	return nil
}

func DBconnect() error {
	DATABASE_URL := os.Getenv("DATABASE_URL")
	if DATABASE_URL == "" {
		DATABASE_URL = "postgresql://posgres:r6IYt6eBXh1FWSac5E9nvZFZZ4YPH0vY@dpg-d5mg8jbe5dus73egh6mg-a.singapore-postgres.render.com/forum_dh74?sslmode=require"
	}
	dbpool, err := pgxpool.New(context.Background(), DATABASE_URL)
	if err != nil {
		log.Fatalf("sentry.Init %s", err)
	}
	db = dbpool
	if err := db.Ping(context.Background()); err != nil {
		log.Fatalf("sentry.Init %s", err)
	}
	fmt.Println("Connected")
	return nil
}

// USER table
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

func CountUser(myUser myTypes.User) (int, error) {
	sql := `SELECT COUNT(user_id) AS cnt FROM users
	WHERE username = $1`
	var cnt int
	err := db.QueryRow(context.Background(), sql, myUser.Username).Scan(&cnt)
	if err != nil {
		return 0, err /// error has occured
	}
	return cnt, nil
}
func FindUser(myUser myTypes.User) (string, string, error) {
	sql := `SELECT username,pass FROM users
	WHERE username = $1`
	var username, password string
	err := db.QueryRow(context.Background(), sql, myUser.Username).Scan(&username, &password)
	if err != nil {
		return "", "", err /// error has occured
	}
	return username, password, nil
}
func NewUser(newuser myTypes.User) error {
	sql := `INSERT INTO users (username,pass) 
	Values ($1,$2)
	RETURNING user_id`
	var id int
	newPassword, err := hashPassword(newuser.Password)
	if err != nil {
		return (&custom_error.UserError{
			StatusCode: http.StatusBadRequest,
			Type:       "INVALID_ACCOUNT",
			Message:    "Password exceeds the limit of 72 characters, please try again",
		})
	}
	err2 := db.QueryRow(context.Background(), sql, newuser.Username, newPassword).Scan(&id)
	fmt.Println(err2)
	if err2 != nil {
		return fmt.Errorf("error creating task: %w", err)
	}
	// fmt.Printf("Success")
	fmt.Printf("Created task with ID %d\n", id)
	return nil
}

// Post Table
func ReturnPosts() ([]myTypes.Post, error) {
	sql := `SELECT post_id,COALESCE(post_username,'Unknown') as post_username,post_content,COALESCE(post_theme,'My theme') as post_theme,num_likes FROM posts`
	var blogs []myTypes.Post
	rows, _ := db.Query(context.Background(), sql)
	defer rows.Close()
	blogs, err := pgx.CollectRows(rows, pgx.RowToStructByName[myTypes.Post])
	fmt.Println(blogs)
	if err != nil {
		return nil, fmt.Errorf("error iterating task row :%w", err)
	}
	return blogs, nil
}

func NewPost(newContent myTypes.Post) error {
	sql := `INSERT INTO posts (post_content,post_username,post_theme) 
	VALUES ($1,$2,$3)
	RETURNING post_id`
	var id int
	err := db.QueryRow(context.Background(), sql, newContent.Post_Content, newContent.Post_Username,
		newContent.Post_Theme).Scan(&id)
	log.Printf("%+v\n", err)
	if err != nil {
		return fmt.Errorf("error creating task: %w", err)
	}
	return nil
}

func ReadPost(id int) (myTypes.Post, error) {
	sql := `SELECT post_id,COALESCE(post_username,'Unknown') as post_username, post_content,COALESCE(post_theme,'My theme') as post_theme,num_likes FROM posts WHERE post_id = $1`
	rows, _ := db.Query(context.Background(), sql, id)
	post, err := pgx.CollectExactlyOneRow(rows, pgx.RowToStructByName[myTypes.Post])
	if err != nil {
		return post, fmt.Errorf("error creating task: %w", err)
	}
	return post, nil
}

func IncrementPostLike(post_id int) error {
	sql := `UPDATE posts
	SET num_likes = num_likes+1
	WHERE post_id = $1`
	err := db.QueryRow(context.Background(), sql, post_id)
	if err != nil {
		return fmt.Errorf("error creating task: %+v", err)
	}
	return nil
}

//Reply Table

func ReturnReplies(id int) ([]myTypes.Reply, error) {
	sql := `SELECT reply_id, post_id, num_likes, reply_content,reply_username FROM replies WHERE post_id = $1`
	rows, _ := db.Query(context.Background(), sql, id)
	defer rows.Close()
	replies, err := pgx.CollectRows(rows, pgx.RowToStructByName[myTypes.Reply])
	fmt.Println(replies)
	if err != nil {
		return nil, fmt.Errorf("error iterating task row :%w", err)
	}
	return replies, nil
}

func NewReply(newContent myTypes.Reply) error {
	sql := `INSERT INTO replies(num_likes,reply_content,reply_username,post_id) 
	Values ($1,$2,$3,$4)
	RETURNING reply_id`
	var id int
	err := db.QueryRow(context.Background(), sql, newContent.Num_Likes,
		newContent.Reply_Content, newContent.Reply_Username,
		newContent.Post_Id).Scan(&id)
	if err != nil {
		return fmt.Errorf("error creating task: %w", err)
	}
	// fmt.Printf("Success")
	fmt.Printf("Created task with ID %d\n", id)
	return nil
}

func IncrementReplyLike(reply_id int) error {
	sql := `UPDATE replies
	SET num_likes = num_likes+1
	WHERE reply_id = $1`
	err := db.QueryRow(context.Background(), sql, reply_id)
	if err != nil {
		return fmt.Errorf("error creating task: %+v", err)
	}
	return nil
}
