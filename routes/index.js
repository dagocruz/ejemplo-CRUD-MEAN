var express = require('express');
/***********************/
var config      = require('../config/database');
/***********************/
var router = express.Router();

var evaluatorCtrl = require('../controllers/evaluatorCtrl');
/* GET home page. */

router.get('/adminTCJ2018/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.route('/adminTCJ2018/evaluator')
  .post(evaluatorCtrl.signup)
  .get(evaluatorCtrl.getEvaluators);

router.param('evaluador',evaluatorCtrl.searchEvaluator);

router.route('/adminTCJ2018/evaluator/:evaluador')
  .put(evaluatorCtrl.setEvaluaciones)
  .delete(evaluatorCtrl.deleteEvaluator);

module.exports = router;
