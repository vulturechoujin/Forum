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
func FindUser(myUser myTypes.User) int {
	sql := `SELECT COUNT(user_id) AS cnt FROM users
	WHERE username = $1
	RETURNING cnt`
	var cnt int
	err := global_conn.QueryRow(context.Background(), sql, myUser.Username).Scan(&cnt)
	if err != nil {
		return -1 /// error has occured
	}
	return cnt
}
func UpdateDatabase(newuser myTypes.User) error {
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
