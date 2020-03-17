const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "ubuntu",
  password: "talk4free2020",
  database: "talk4freeDB",
  charset: "utf8mb4"
});

connection.connect(err => {
  if (err) {
    console.log(err);
    return err;
  }
});

module.exports = {
  connection
};
