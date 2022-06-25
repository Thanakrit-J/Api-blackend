var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'fullstack'
});

var app = express()
app.use(cors())
app.use(express.json())

// show Data
app.get('/student', function (req, res, next) {
    connection.query(
      'SELECT * FROM `student`',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })

  app.post('/student', function (req, res, next) {
    connection.query(
      'INSERT INTO `student`(`name`, `lastname`) VALUES (?, ?)',
      [req.body.name, req.body.lastname],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.put('/student', function (req, res, next) {
    connection.query(
      'UPDATE `student` SET `name`= ?, `lastname`= ? WHERE ID = ?',
      [req.body.name, req.body.lastname, req.body.ID],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.delete('/student', function (req, res, next) {
    connection.query(
      'DELETE FROM `student` WHERE ID = ?',
      [req.body.ID],
      function(err, results) {
        res.json(results);
      }
    );
  })


app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})