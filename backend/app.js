//Import the express modules
const express = require("express");
//Import the mysql module
const mysql = require("mysql2");

//Initialize an instance of express
const app = express();

//Define the connection parameters for the database
const dbCon = {
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  port: "3306",
  host: "localhost",
  user: "demoapp",
  password: "Pv55w0rd!",
  database: "demoapp",
};

//Create a connection to the database
const con = mysql.createConnection(dbCon);

//Connect to the database
con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

//Use the express.json() middleware to parse the request body
app.use(express.json());

//Create a simple get request handler to send a response back
app.get("/", (req, res) => {
  res.send("Testing!");
});

//Allow CORS to all
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//POST request handler to ass a new employee to the database
app.post("/add-employee", (req, res) => {
  console.log(req.body);

  //Write the SQL query to add to the database named employee_test
  const sql = `INSERT INTO employee_test (first_Name, last_Name, email, password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;

  //Execute the query
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`Recored inserted...`);
  });
  //Send a response back to the client
  const response = {
    status: "success",
    message: "Employee added successfuly",
  };
  res.status(200).json(response);
});

//Post request handler to login an employee which comes to this route /login

app.post("/login", (req, res) => {
  console.log(req.body);
  //write the sql query to retrive the employee with the email and password provided by the user and compare it with the data in the database

  const sql = `SELECT * FROM employee_test WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;

  //Execute the query
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    //Check the result is empty or not
    if (result.length > 0) {
      //send a response back to the client
      const response = {
        status: "sucsess",
        message: "Login successful",
      };
      res.status(200).json(response);
    } else {
      //send a response back to the client
      const response = {
        status: "failure",
        message: "Login failed",
      };
      res.status(200).json(response);
    }
  });
});

//Set up the port to listen to
const PORT = process.env.PORT || 4000;

//Set up the listener
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
