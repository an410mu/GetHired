CREATE DATABASE jobs;
\c jobs;


CREATE TABLE users(
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE job(
  job_id INT NOT NULL,
  user_id INT NOT NULL,
  company VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(100) NOT NULL,
  interview INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

/*  Execute this file from the command line by typing:
psql -U postgres -f ./server/schema.sql
 *  to create the database and the tables.*/