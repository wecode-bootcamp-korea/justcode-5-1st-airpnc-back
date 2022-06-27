CREATE TABLE room_city(
    city_id int not null,
    room_id int not null,
    foreign key(city_id) references city(id) ON DELETE CASCADE,
    foreign key(room_id) references room(id) ON DELETE CASCADE
);