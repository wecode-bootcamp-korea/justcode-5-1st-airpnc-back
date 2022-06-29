CREATE TABLE photo(
	id INT NOT NULL AUTO_INCREMENT,
	caption varchar(3000),
	file_url varchar(3000) NOT NULL,
	room_id int NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(room_id) REFERENCES room(id) ON DELETE CASCADE
);