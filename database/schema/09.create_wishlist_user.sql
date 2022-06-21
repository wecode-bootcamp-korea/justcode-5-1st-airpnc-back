CREATE TABLE wishlist_user 
(
	id int NOT NULL auto_increment,
	name varchar(1000),
	user_id int NOT NULL,
	status varchar(500),
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp,
	primary key (id),	
	foreign key (user_id) reference users (id) ON DELETE CASCADE
);