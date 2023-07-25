const sql = require("./db.js");

// constructor
const Scoreboard = function(scoreboard) {
  this.email = scoreboard.email;
  this.nickname = scoreboard.nickname;
  this.score = scoreboard.score;
};

Scoreboard.create = (newScoreboard, result) => {
  sql.query("INSERT INTO scoreboard SET ?", newScoreboard, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created scoreboard: ", { id: res.insertId, ...newScoreboard });
    result(null, { id: res.insertId, ...newScoreboard });
  });
};

Scoreboard.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM scoreboard WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found scoreboard: ", res[0]);
      result(null, res[0]);

      return;
    }

    // not found Scoreboard with the id
    result({ kind: "not_found" }, null);
  });
};

Scoreboard.findById = (id, result) => {
  sql.query(`SELECT * FROM scoreboard WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found scoreboard: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Scoreboard with the id
    result({ kind: "not_found" }, null);
  });
};

Scoreboard.getHigh = (result) => {
  let query = "SELECT * FROM `scoreboard` ORDER BY score DESC LIMIT 20";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("scoreboard: ", res);
    result(null, res);
  });
};

Scoreboard.getAll = (email, result) => {
  let query = "SELECT * FROM scoreboard";

  if (email) {
    query += ` WHERE email LIKE '%${nickname}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("scoreboard: ", res);
    result(null, res);
  });
};

Scoreboard.updateById = (id, scoreboard, result) => {
  sql.query(
    "UPDATE scoreboard SET email = ?, nickname = ?, score = ? WHERE id = ?",
    [scoreboard.email, scoreboard.nickname, scoreboard.score, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Scoreboard with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated scoreboard: ", { id: id, ...scoreboard });
      result(null, { id: id, ...scoreboard });
    }
  );
};

Scoreboard.remove = (id, result) => {
  sql.query("DELETE FROM scoreboard WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Scoreboard with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted scoreboard with id: ", id);
    result(null, res);
  });
};

module.exports = Scoreboard;
