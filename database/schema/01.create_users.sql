CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) UNIQUE NOT NULL,
	phone_number VARCHAR(100) UNIQUE,
    name VARCHAR(50),
	password VARCHAR(300) NOT NULL,
	profile_image VARCHAR(3000),
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    PRIMARY KEY(id)
);