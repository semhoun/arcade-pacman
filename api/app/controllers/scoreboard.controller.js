const Scoreboard = require("../models/scoreboard.model.js");
const ScoreHistory = require("../models/score_history.model.js");

// Create and Save a new score
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Score history
  const scoreHistory = new ScoreHistory({
    email: req.body.email,
    nickname: req.body.nickname,
    score: req.body.score,
    ip: req.header('x-forwarded-for') || req.socket.remoteAddress
  });

  // Save Scoreboard in the database
  ScoreHistory.create(scoreHistory, (err, data) => {
    if (err) {
      console.log(err.message)
    }
  });


  // Create a Scoreboard
  const scoreboard = new Scoreboard({
    email: req.body.email,
    nickname: req.body.nickname,
    score: req.body.score
  });

  // Get user last higscore
  Scoreboard.findByEmail(scoreboard.email, (err, data) => {
    if (data == null) {
      // Save Scoreboard in the database
      Scoreboard.create(scoreboard, (err, data) => {
        if (err)
          res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Scoreboard."
          });
        else res.send(data);
      });
      return;
    }
    if (data.score > scoreboard.score) {
      res.send({});
      return;
    }

    Scoreboard.updateById(data.id, scoreboard, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Scoreboard with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Scoreboard with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  });
};

// Retrieve hihgh Scoreboards from the database
exports.findHigh = (req, res) => {
  Scoreboard.getHigh((err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving scoreboards."
      });
    else res.send(data);
  });
};

// Retrieve all Scoreboards from the database (with condition).
exports.findAll = (req, res) => {
  const email = req.query.email;

  Scoreboard.getAll(email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving scoreboards."
      });
    else res.send(data);
  });
};

// Find a single Scoreboard by Id
exports.findOne = (req, res) => {
  Scoreboard.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Scoreboard with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Scoreboard with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Scoreboards
exports.findAllPublished = (req, res) => {
  Scoreboard.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving scoreboards."
      });
    else res.send(data);
  });
};

// Update a Scoreboard identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Scoreboard.updateById(
    req.params.id,
    new Scoreboard(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Scoreboard with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Scoreboard with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Scoreboard with the specified id in the request
exports.delete = (req, res) => {
  Scoreboard.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Scoreboard with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Scoreboard with id " + req.params.id
        });
      }
    } else res.send({ message: `Scoreboard was deleted successfully!` });
  });
};

// Delete all Scoreboards from the database.
exports.deleteAll = (req, res) => {
  Scoreboard.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while removing all scoreboards."
      });
    else res.send({ message: `All Scoreboards were deleted successfully!` });
  });
};
