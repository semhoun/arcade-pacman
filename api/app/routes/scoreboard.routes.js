module.exports = app => {
  const scoreboard = require("../controllers/scoreboard.controller.js");

  var router = require("express").Router();

  // Create a new Scoreboard
  router.post("/", scoreboard.create);

  // Retrieve all Scoreboard
  router.get("/", scoreboard.findHigh);

  // Retrieve all Scoreboard
  router.get("/all", scoreboard.findAll);

  app.use('/api/scoreboard', router);
};
