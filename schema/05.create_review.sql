CREATE TABLE review(id INT NOT NULL AUTO_INCREMENT,
review varchar(3000) NOT NULL,
score INT,
user_id INT,
room_id INT,
PRIMARY KEY(id),
FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN key(room_id) REFERENCES room(id) ON DELETE CASCADE)

