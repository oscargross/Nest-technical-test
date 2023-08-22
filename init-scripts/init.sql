CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

INSERT INTO users (name, email) VALUES ('Oscar1', 'oscar@example.com');
INSERT INTO users (name, email) VALUES ('Oscar2', 'oscar@example.com');
