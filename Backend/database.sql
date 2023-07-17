CREATE DATABASE wecode;

CREATE TABLE users(
    u_id SERIAL PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_email VARCHAR(60) NOT NULL,
    user_password VARCHAR(260) NOT NULL,   
);
-- CREATE TABLE questions(
--     q_id SERIAL PRIMARY KEY,
--     ques_title VARCHAR(100) NOT NULL,
--     ques_description VARCHAR(1000) NOT NULL,
--     ques_   
-- )

CREATE TABLE submissions(
    s_id SERIAL PRIMARY KEY,
    submission_ques INTEGER REFERENCES questions(q_id),
    submitter INTEGER REFERENCES users(u_id),
    submission_time TIMESTAMP DEFAULT NOW(),
    submitted_code TEXT NOT NULL,
    status BOOLEAN NOT NULL
);