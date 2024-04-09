const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");

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
  console.log("Server is listening in http://localhost" + port);
});

server.get("/movies", async(req, res)=> {
  const connection = await getDBConnection();
  const sql = "SELECT * FROM movies";
  const [moviesResult] = await connection.query(sql); 
  connection.end();
  res.status(200).json(
    {
      success: true,
      movies:  moviesResult
    }
  ); 
});