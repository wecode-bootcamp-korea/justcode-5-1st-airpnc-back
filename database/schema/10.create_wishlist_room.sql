CREATE TABLE wishlist_room 
(
	id int NOT NULL auto_increment,
	room_id int NOT NULL,
	wishes_id int NOT NULL,
	status varchar(500),
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp,
	primary key (id),
	foreign key (room_id) reference room (id) ON DELETE CASCADE
	foreign key (wishes_id) reference wishlist_user (id) ON DELETE CASCADE
)