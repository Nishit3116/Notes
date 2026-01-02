-- Sample Dataset for QuickNotes Auth Database
-- This file contains sample data for testing purposes

USE quicknotes_auth_db;

-- Insert sample users
-- Note: Password hashes are examples (in real app, use bcrypt)
-- Example passwords: "password123" for all users
INSERT INTO users (name, email, password_hash) VALUES
('John Doe', 'john.doe@example.com', '$2b$10$YourHashedPasswordHere123456789012345678901234567890123'),
('Jane Smith', 'jane.smith@example.com', '$2b$10$AnotherHashedPasswordExample12345678901234567890123456789'),
('Mike Johnson', 'mike.johnson@example.com', '$2b$10$ThirdHashedPasswordExample123456789012345678901234567890'),
('Sarah Williams', 'sarah.williams@example.com', '$2b$10$FourthHashedPasswordExample12345678901234567890123456789'),
('David Brown', 'david.brown@example.com', '$2b$10$FifthHashedPasswordExample123456789012345678901234567890');

-- Insert sample notes
INSERT INTO notes (title, content, user_id) VALUES
-- Notes for John Doe (user_id: 1)
('Welcome to QuickNotes', 'This is my first note. I love this app!', 1),
('Shopping List', 'Milk, Bread, Eggs, Cheese, Butter', 1),
('Meeting Notes', 'Discussed project timeline and deliverables for Q1 2026', 1),

-- Notes for Jane Smith (user_id: 2)
('Travel Plans', 'Trip to Paris in March. Book flights and hotel.', 2),
('Book Recommendations', '1. Atomic Habits\n2. Deep Work\n3. The Lean Startup', 2),

-- Notes for Mike Johnson (user_id: 3)
('Workout Routine', 'Monday: Chest\nWednesday: Back\nFriday: Legs', 3),
('Project Ideas', 'Build a weather app, Create a portfolio website, Learn Docker', 3),
('Daily Goals', 'Wake up at 6 AM, Exercise for 30 mins, Read for 1 hour', 3),

-- Notes for Sarah Williams (user_id: 4)
('Recipe: Pasta Carbonara', 'Ingredients: Pasta, Eggs, Bacon, Parmesan, Pepper\nCook pasta, fry bacon, mix with eggs and cheese.', 4),
('Grocery List', 'Tomatoes, Onions, Garlic, Olive Oil, Pasta', 4),

-- Notes for David Brown (user_id: 5)
('Code Snippets', 'Useful JavaScript array methods: map, filter, reduce, forEach', 5),
('Learning Resources', 'FreeCodeCamp, MDN Web Docs, JavaScript.info', 5);

-- Display inserted data
SELECT 'Users created:' AS Message;
SELECT user_id, name, email, created_at FROM users;

SELECT '\nNotes created:' AS Message;
SELECT note_id, title, user_id, created_at FROM notes ORDER BY user_id;
