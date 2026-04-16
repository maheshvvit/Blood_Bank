CREATE DATABASE IF NOT EXISTS blood_bank_db;
USE blood_bank_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    s_id VARCHAR(50) PRIMARY KEY,
    s_name VARCHAR(100) NOT NULL,
    s_age INT,
    s_email VARCHAR(100) NOT NULL,
    s_phone_no VARCHAR(20) NOT NULL,
    s_deparment VARCHAR(100),
    s_year VARCHAR(50),
    s_blood_group VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
