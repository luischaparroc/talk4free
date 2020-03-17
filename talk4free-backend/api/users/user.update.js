const connection = require("../db_connection").connection;
require("dotenv").config();
const axios = require("axios");

const joinroom = (data, callback) => {
  axios({
    method: "PUT",
    headers: {
      token: process.env.ZAFRA_KEY
    },
    url: `http://localhost:5000/api/rooms/add/${data.room}/${data.user}`
  });
  connection.query(
    `UPDATE users SET room_id = ? WHERE id = ?`,
    [data.room, data.user],
    (error, result) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

const UserInRooms = (req, res) => {
  joinroom(req.params, err => {
    if (err) {
      return res.send(err);
    }
    return res.send("user joined in the room");
  });
};

/* ========================================================= */

const outroom = (data, callback) => {
  connection.query(
    `UPDATE users SET room_id = ? WHERE id = ?`,
    [null, data.user],
    (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

const UserOutRooms = (req, res) => {
  outroom(req.params, err => {
    if (err) {
      return res.send(err);
    }
    return res.send("user out of the room");
  });
};

module.exports = {
  UserInRooms,
  UserOutRooms
};
