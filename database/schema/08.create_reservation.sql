CREATE TABLE reservation(
  id INT NOT NULL AUTO_INCREMENT,
  reservation_no varchar(50),
  check_in date not null,
  check_out date not null,
  guests int,
  user_id int,
  room_id int,
  created_at DATETIME DEFAULT NOW(),
  updated_at DATETIME,
  primary key(id), 
  FOREIGN key (room_id) REFERENCES room(id) ON DELETE CASCADE,
  FOREIGN key (user_id) REFERENCES users(id) ON DELETE CASCADE
);
