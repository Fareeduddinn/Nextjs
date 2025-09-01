DROP TABLE IF EXISTS schools;

CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(255) NOT NULL
);

INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES
('Green Valley High', '123 Elm Street', 'Springfield', 'IL', '1234567890', '/schoolImages/sample1.jpg', 'info@greenvalley.com'),
('Sunrise Academy', '456 Oak Avenue', 'Madison', 'WI', '9876543210', '/schoolImages/sample2.jpg', 'contact@sunriseacademy.com'),
('Blue Ridge School', '789 Pine Road', 'Denver', 'CO', '5555555555', '/schoolImages/sample3.jpg', 'hello@blueridge.com');
