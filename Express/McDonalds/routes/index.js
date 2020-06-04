var express = require('express');
var router = express.Router();
var menuController = require('../controllers/menu');
var couponController = require('../controllers/coupon');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/menu/:menu/:order', menuController.READ);
router.get('/coupon/:select', couponController.READ);
router.get('/home', menuController.HOME);

// GET /home
// GET /menu/:menu/:order
// GET /coupon/:select[]

module.exports = router;
