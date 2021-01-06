const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'NewPassword',
  database: 'employeeManagement_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to the DB");
});
module.exports = connection;