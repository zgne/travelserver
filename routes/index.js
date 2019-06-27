var express = require('express');
var router = express.Router();
// var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.use(session({
//   secret: 'aneiffr',
//   name: 'sessionId',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 1000*60*60,
//     secure: false
//   },
//   // store: new mongoStore({
//   // 	db: dbOptions.dbName,
//   // 	url: 'mongodb://localhost/travelserver'
//   // })
// }))

module.exports = router;
