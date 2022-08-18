CREATE DATABASE jobs;
\c jobs;


CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE job(
  job_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  company VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(100) NOT NULL,
  location VARCHAR(255) NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

/*  Execute this file from the command line by typing:
psql -U postgres -f ./server/schema.sql
 *  to create the database and the tables.*/