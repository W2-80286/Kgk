create DATABASE Kgk;

use Kgk;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL ,
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     

);
INSERT INTO user (name, dateOfBirth, email, password) 
VALUES ('Tanuja', '1999-07-15', 'pawartanuja03@gmail.com', '1234');

