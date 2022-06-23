CREATE TABLE review(id INT NOT NULL AUTO_INCREMENT,
review text NOT NULL,
score INT,
user_id INT NOT NULL,
room_id INT NOT NULL,
reservation_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN key(room_id) REFERENCES room(id) ON DELETE CASCADE),
FOREIGN key(reservation_id) REFERENCES reservation(id) ON DELETE CASCADE)

