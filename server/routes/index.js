var express = require("express");
var router = express.Router();
const projectRoutes = require('./Project');

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.use('/projects', projectRoutes)

module.exports = router;
