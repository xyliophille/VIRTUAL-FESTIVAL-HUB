-- Create database
CREATE DATABASE IF NOT EXISTS festival_hub;

-- Use the database
USE festival_hub;

-- Create festivals table
CREATE TABLE IF NOT EXISTS festivals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear any existing data
DELETE FROM festivals;

-- Insert sample festival data
-- Insert sample festival data
-- Insert sample festival data
INSERT INTO festivals (name, date, description, link) VALUES
("Chhath Puja", "2025-10-25", "Festival dedicated to Sun God", "https://meet.google.com/xy"),
("Diwali", "2025-10-20", "Festival of lights celebrating victory of light over darkness", "https://zoom.us/j/12345678"),
("Holi", "2025-03-14", "Festival of colors celebrating spring and love", "https://meet.google.com/hx"),
("Navratri", "2025-09-26", "Nine-night festival dedicated to Goddess Durga", "https://zoom.us/j/navratri2t");
-- Verify the data
SELECT * FROM festivals;