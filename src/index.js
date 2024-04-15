const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "sql.freedb.tech",
    user: "freedb_module_4_db",
    password: "D&DSYcVsb3hz&q3",
    database: "freedb_backend_movies",
  });
  connection.connect();
  return connection;
}

const port = 4000;
server.listen(port, () => {
  console.log("Server is listening in http://localhost:" + port);
});

//ENDPOINT MOVIES
server.post("/sign-up", async (req, res) => {
  console.log("esto es el email y pass", req.body);

  const { email, password } = req.body;
  const connection = await getDBConnection();
  const emailQuery = "SELECT * FROM users WHERE email = ?";
  const [emailResult] = await connection.query(emailQuery, [email]);

  // console.log("esto es algo", emailResult);
  if (emailResult.length === 0) {
    const passwordHashed = await bcrypt.hash(password, 10);
    const newUserQuery = "INSERT INTO users (email, password) VALUES (?,?)";
    const [newUserResults] = await connection.query(newUserQuery, [
      email,
      passwordHashed,
    ]);
    res.status(201).json({
      success: true,
      id: newUserResults.id,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Email already registered",
    });
  }
});


server.get("/movies", async (req, res) => {
  const connection = await getDBConnection();
  const genreFilterParam = req.query.genre;
  const sql = "SELECT * FROM movies WHERE genre= ?";
  const [moviesResult] = await connection.query(sql, [genreFilterParam]);

  console.log(req.query);
  connection.end();
  res.status(200).json({
    success: true,
    movies: moviesResult,
  });
});

server.get("/movies/:id", async (req, res) => {
  console.log(req.params.id);
});

//ENDPOINTS USERS
//signup


