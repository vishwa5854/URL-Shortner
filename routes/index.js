var express = require('express');
var router = express.Router();
const condenser = require("../models/condenser");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

router.get("/:id", (req, res) => {
  condenser.getActualURL(req.params.id, (error, data) => {
    if(error){
      res.send(error);
    }
    else {
      res.redirect(data);
    }
  })
});

module.exports = router;
