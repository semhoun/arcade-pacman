const sql = require("./db.js");

// constructor
const ScoreHistory = function(scorehistory) {
  this.email = scorehistory.email;
  this.nickname = scorehistory.nickname;
  this.score = scorehistory.score;
  this.ip = scorehistory.ip;
  this.date = scorehistory.date;
};

ScoreHistory.create = (newScoreHistory, result) => {
  sql.query("INSERT INTO score_history SET ?", newScoreHistory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created scoreHistory: ", { id: res.insertId, ...newScoreHistory });
    result(null, { id: res.insertId, ...newScoreHistory });
  });
};

ScoreHistory.findById = (id, result) => {
  sql.query(`SELECT * FROM score_history WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found scoreHistory: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ScoreHistory with the id
    result({ kind: "not_found" }, null);
  });
};

ScoreHistory.getAll = (email, result) => {
  let query = "SELECT * FROM score_history";

  if (email) {
    query += ` WHERE email LIKE '%${email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("scoreHistory: ", res);
    result(null, res);
  });
};

module.exports = ScoreHistory;
