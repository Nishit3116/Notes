import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "YOUR_MYSQL_PASSWORD",
  database: "quicknotes_auth_db",
});

/* ---------------- AUTH ---------------- */

// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, hash]
  );

  res.json({ message: "User registered" });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0)
    return res.status(401).json({ message: "Invalid email" });

  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid)
    return res.status(401).json({ message: "Invalid password" });

  res.json({
    message: "Login successful",
    user_id: rows[0].user_id,
    name: rows[0].name,
  });
});

/* ---------------- NOTES ---------------- */

// Create note
app.post("/api/notes", async (req, res) => {
  const { title, content, user_id } = req.body;

  await db.query(
    "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, user_id]
  );

  res.json({ message: "Note added" });
});

// Get notes of logged-in user
app.get("/api/notes/:user_id", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC",
    [req.params.user_id]
  );

  res.json(rows);
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
