const connection = require("../db_connection").connection;
const axios = require("axios");

const deactive = (data, callback) => {
  connection.query(
    `UPDATE rooms SET active = false WHERE id = ?`,
    [data.id],
    (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    }
  );
};

const DeactiveRoom = (req, res) => {
  deactive(req.params, err => {
    if (err) {
      return res.send(err);
    }
    return res.send("status was updated!");
  });
};

/* ==================================================================== */

const add = (data, callback) => {
  connection.query(
    `SELECT users FROM rooms WHERE id=?`,
    [data.id],
    (err, resp1) => {
      if (err) return callback(err);
      // console.log(data.userid, resp1[0].users);
      if (resp1[0].users === null) {
        resp1 = data.userid;
      } else {
        resp1 = resp1[0].users + ", " + data.userid;
      }
      connection.query(
        `UPDATE rooms SET users=? WHERE id=?`,
        [resp1, data.id],
        (err, resp2) => {
          if (err) return callback(err);
          return callback(null, resp2);
        }
      );
    }
  );
};

const UserinRoom = (req, res) => {
  add(req.params, (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send("User added to the Room");
  });
};

/* =============================================================================== */
const increase = (data, callback) => {
  connection.query(
    `SELECT max_user, active_users FROM rooms WHERE id=?`,
    [data.id],
    (err, resp1) => {
      if (err) return callback(err);
      if (resp1[0].max_user > resp1[0].active_users) {
        connection.query(
          `UPDATE rooms SET active_users = active_users + 1 WHERE id=?`,
          [data.id],
          (error, result) => {
            if (error) {
              return callback(error);
            }
            return callback(null, result);
          }
        );
      } else {
        return callback("Cant add more users");
      }
    }
  );
};

const AddUserInRoom = (req, res) => {
  increase(req.params, (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send("User addded in the Room");
  });
};

/* =============================================================================== */
const decrease = (data, callback) => {
  connection.query(
    `SELECT active_users FROM rooms WHERE id = ?`,
    [data.id],
    (err, resp1) => {
      if (err) return callback(err);
      if (resp1[0].active_users >= 1) {
        connection.query(
          `UPDATE rooms SET active_users = active_users - 1 WHERE id=?`,
          [data.id],
          (error, result) => {
            if (error) {
              return callback(error);
            }
            resp1[0].active_users -= 1;
            if (resp1[0].active_users === 0) {
              axios({
                method: "PUT",
                headers: {
                  token: process.env.ZAFRA_KEY
                },
                url: `http://localhost:5000/api/rooms/deactive/${data.id}`
              });
            }
            return callback(null, result);
          }
        );
      } else {
        return callback("Cant delete more users");
      }
    }
  );
};

const RemoveUserInRoom = (req, res) => {
  decrease(req.params, (err, result) => {
    if (err) {
      return res.send(err);
    }
    return res.send("User removed from the Room");
  });
};

module.exports = {
  DeactiveRoom,
  UserinRoom,
  AddUserInRoom,
  RemoveUserInRoom
};
