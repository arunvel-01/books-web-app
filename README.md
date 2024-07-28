# Books Web App
This is a simple web application for managing books. It allows users to view, add, update, and delete books. The backend is built with Express.js and MySQL, while the frontend is built with React.js.

# Features
View all books
Add a new book
Update an existing book
Delete a book

# Prerequisites
Node.js
npm or yarn
MySQL

# Getting Started: 

# Backend Setup
1: Clone the repository:
git clone https://github.com/your-username/books-web-app.git
cd books-web-app
2: Install backend dependencies:
cd server
npm install
3: Create a MySQL database and a books table:
CREATE DATABASE books_db;
USE books_db;
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  desc TEXT,
  cover VARCHAR(255),
  price DECIMAL(10, 2)
);
4: Create a .env file in the server directory with your database configuration:
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=books_db
PORT=5000
5: Start the backend server:
node index.js
The backend server should be running on http://localhost:5000.

# Frontend Setup
1: Install frontend dependencies:
cd ../client
npm install
2: Start the frontend development server:
npm start

# Project Structure

books-web-app/
├── client/          # Frontend code
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Add.js
│   │   │   ├── Books.js
│   │   │   └── Update.js
│   │   ├── styles.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
├── server/          # Backend code
│   ├── index.js
│   ├── package.json
│   └── ...
└── README.md

# Live website: 
https://books-web-app-murex.vercel.app/

# Usage: 
1: Adding a Book
Click on "Add new book" to navigate to the add book page. Fill out the form and submit to add a new book.

2: Updating a Book
Click on the "Update" button next to a book to navigate to the update book page. Modify the details and submit to update the book.

3: Deleting a Book
Click on the "Delete" button next to a book to delete it.

# Deployment
# Deploying Backend to Render
Create a new service on Render and connect your GitHub repository.
Add the following build and start commands:
Build Command: npm install
Start Command: npm start
Set the environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT).
Deploy the service.

# Deploying Frontend to Vercel
Create a new project on Vercel and connect your GitHub repository.
Add the project.
Deploy the project.

# License
This project is licensed under the MIT License.

