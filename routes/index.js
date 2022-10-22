var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  if (req.session.user) {
    res.redirect('/student')
  }
  else {
    
    res.render('index', {layout: false});
  }
});

module.exports = router;
