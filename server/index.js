import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import { job } from "./cron.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

let db;

const connectToDatabase = () => {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      setTimeout(connectToDatabase, 2000); // Reattempt connection after 2 seconds
      return;
    }
    console.log("Connected to MySQL database.");

    // Create the books table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS books (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(45) NOT NULL,
        \`desc\` VARCHAR(1000) NOT NULL,
        cover VARCHAR(1000) DEFAULT NULL,
        price INT NOT NULL,
        PRIMARY KEY (id)
      )
    `;
    
    db.query(createTableQuery, (err, result) => {
      if (err) {
        console.error("Error creating books table:", err);
        return;
      }
      console.log("Books table created or already exists.");
    });
  });

  db.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectToDatabase(); // Reconnect on connection lost
    } else {
      throw err;
    }
  });
};

connectToDatabase();

app.get("/", (req, res) => {
  res.json("Hello from the server");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});

app.post("/add", (req, res) => {
  const { title, desc, price, cover } = req.body;
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?, ?, ?, ?)";
  const values = [title, desc, price, cover];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error adding book:", err);
      return res.status(500).json(err);
    }
    res.json("Book has been added successfully.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).json(err);
    }
    res.json("Book has been deleted successfully.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).json(err);
    }
    res.json("Book has been updated successfully.");
  });
});

job.start();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
