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

CREATE TABLE Word_Drawing_Pair
 (
Pair_id SERIAL,
Word varchar(20) NOT NULL,
Drawing json NOT NULL,
PRIMARY KEY(Pair_id),
UNIQUE (Word)
);

//test inserts
INSERT INTO word_drawing_pair
(word, drawing)
VALUES ('testtest', '{ "testjson": "aaaa", "action": {"tool": "pencil","color": 6}}');