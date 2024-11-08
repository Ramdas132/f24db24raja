var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('department', { title: 'Search Results for Department' });
});

module.exports = router;
