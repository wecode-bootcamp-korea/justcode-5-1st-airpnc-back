CREATE TABLE room 
(
  id int NOT NULL auto_increment,
  name varchar(500),
  description text,
  price float,
  address varchar(500),
  guests int,
  beds int,
  bedrooms int,
  baths float,
  instant_book boolean,
  host_id int,
  city_id int,
  residential_type int,
  room_type int,
  location_type int,
  primary key (id),
  foreign key (host_id) references users(id) ON DELETE CASCADE,
  foreign key (room_type) references roomType(id) ON DELETE CASCADE,
  foreign key (residential_type) references residentialType(id) ON DELETE CASCADE,
  foreign key (location_type) references locationType(id) ON DELETE CASCADE
);