var express = require('express');
var controllerUsers = require('../controllers/users')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',controllerUsers.login);
router.post('/register',controllerUsers.register);
router.get('/verify',controllerUsers.verify);
router.get('/logout',controllerUsers.logout);
router.post('/getUsers',controllerUsers.getUsers);
router.post('/findPassword',controllerUsers.findPassword);

module.exports = router;
