'use strict';
(function(){
	var mongoose = require('mongoose');
	require('../models/Evaluator');
	var Evaluator = mongoose.model('Evaluator');

	exports.signup = function(req,res){
		if (!req.body.name || !req.body.password) {
	    res.json({success: false, msg: 'Please pass name and password.'});
	  } else {
	    var newEvaluator = new Evaluator({
	      name: req.body.name,
	      password: req.body.password,
	      nombreCompleto: req.body.nombreCompleto
	    });
	    // save the evaluator
	    newEvaluator.save(function(err,evaluator) {
	      if (err) {
	        return res.status(403).jsonp({msg: 'Correo '+req.body.name+' actualmente en uso.'});
	      }
	      //res.json({success: true, msg ex: 'Successful created new user.'});
	      //console.log(user);
	      res.status(200).jsonp(evaluator);
	    });
	  }
	};

	exports.searchEvaluator = function(req,res,next,id){
    Evaluator.findById(id,{password:0},function(err,evaluator){
      if(err) next(err);
      else
        if(evaluator){
          req.evaluator = evaluator;
          next();
        }
        else
          next(new Error('No se encontró el evaluador'));
    });
  };

  exports.updateEvaluator = function(req,res){
    var query = {_id:req.evaluator._id};
    console.log(req.body);
    Evaluator.findOneAndUpdate(query,req.body,{ 'new': true },function(err,evaluator){
      if(err)
        return res.status(500).send(err.message);
      //evaluator.password = null;
      res.status(200).jsonp(evaluator);
    });
  };

  exports.setEvaluaciones = function(req,res){
    var query = {_id:req.evaluator._id};
    //console.log(req.body);
    Evaluator.findOneAndUpdate(query,{$set:{evaluaciones:req.body.evaluaciones}},{ 'new': true },function(err,evaluator){
      if(err)
        return res.status(500).send(err.message);
      //evaluator.password = null;
      res.status(200).jsonp(evaluator);
    });
  };

	exports.deleteEvaluator = function(req,res){
    var query = {_id:req.evaluator._id};
    //console.log(req.body);
    Evaluator.deleteOne(query,function(err,evaluator){
      if(err)
        return res.status(500).send(err.message);
      //evaluator.password = null;
      res.status(200).jsonp(evaluator);
    });
  };

  exports.getEvaluators = function(req,res){
  	Evaluator.find({},{evaluaciones:0},function(err,evaluators){
  		if(err)
  			return res.status(500).send(err.message);
  		res.status(200).jsonp(evaluators);
  	});
  };

})();
