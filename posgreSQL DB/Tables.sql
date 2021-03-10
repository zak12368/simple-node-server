CREATE TABLE Account (
Account_userName varchar(20), 
Account_firstname varchar(20),
Account_lastname varchar(20),
Account_password varchar(20),
PRIMARY KEY(Account_username),
UNIQUE (Account_username)
);

CREATE TABLE Connected_Accounts
 (
Account_userName varchar(20),
PRIMARY KEY(Account_username),
UNIQUE (Account_username),
FOREIGN KEY(Account_username)
REFERENCES Account(Account_username)
);

CREATE DOMAIN typeDifficulty AS CHAR(10)
	CHECK (VALUE IN ('Easy', 'Medium', 'Hard'));

CREATE TABLE Word_Drawing_Pair
 (
Pair_id SERIAL,
Word varchar(20) NOT NULL,
Drawing json NOT NULL,
Difficulty typeDifficulty NOT NULL,
PRIMARY KEY(Pair_id),
UNIQUE (Word)
);

CREATE TABLE Chat_room
 (
Chat_room_id SERIAL,
creation_date DATE NOT NULL,
PRIMARY KEY(Chat_room_id)
);

CREATE TABLE Chat_user
 (
Chat_user_id varchar(20) NOT NULL,
Chat_room_id INT NOT NULL,
PRIMARY KEY(Chat_user_id, Chat_room_id),
FOREIGN KEY(Chat_user_id) REFERENCES Account(Account_userName),
FOREIGN KEY(Chat_room_id) REFERENCES Chat_room(Chat_room_id)
);

CREATE TABLE Message
 (
Message_id SERIAL,
Chat_user_id varchar(20) NOT NULL UNIQUE,
Chat_room_id INT NOT NULL,
time_stamp DATE NOT NULL,
content TEXT,
PRIMARY KEY(Message_id, Chat_user_id, Chat_room_id),
FOREIGN KEY(Chat_user_id) REFERENCES Account(Account_userName),
FOREIGN KEY(Chat_room_id) REFERENCES Chat_room(Chat_room_id)
);

//test inserts
INSERT INTO word_drawing_pair
(word, drawing, Difficulty)
VALUES ('testtest', '{ "testjson": "aaaa", "action": {"tool": "pencil","color": 6}}', 'Easy');