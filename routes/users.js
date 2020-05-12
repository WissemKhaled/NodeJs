var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Mongo = require('../bin/mongo');
var uniqid = require('uniqid');
var crypto = require('crypto');

// login
router.put('/', function(req, res, next) {

  Mongo.getInstance()
  .collection('users')
  .findOne({$or : [ {email: req.body.email }, {name: req.body.email} ] }, function(err,result) {
    console.log(result);
    if(err) {
      return res.json({
        status : false,
        message: res.message
      })
    }
    if(!result || !result._id || crypto.createHash('sha256').update(req.body.password+result.salt).digest('hex') !== result.password ) {

        return res.json({
          status : false,
          message : 'Merci de vérifier vos identifiants'
        })
      
    }
    req.session.user = result ;
    return res.json({
      status:true
    });
  })

});

// creation d'un compte utilisateur => créer un nouveau me
router.post('/', function(req, res, next) {

  let datas = {};
  let errors = [];
  if(!req.body.name || !/^([\w\s]{6,})$/.test(req.body.name)) {
    errors.push("Nom d'utilisateur ");
  }
  if(!req.body.email || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(req.body.email)
  ) {
    errors.push('Email');

  }
  if (!req.body.password || !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(req.body.password)) {
    errors.push('Password');
  }  
  if(!req.body.password_confirm|| req.body.password_confirm !== req.body.password) {
    errors.push('Les deux mots de passe ne sont pas identiques');
  }

  if(errors.length) {
    return res.json({
      status: false,
      message: "Merci de vérifier les champs : " + errors.join(', ')
    })
  }

  let password = '';
  let salt = uniqid();
  password = crypto.createHash('sha256').update(req.body.password+salt).digest('hex');

 datas = {
   username : req.body.name,
   email: req.body.email,
   password : password,
   salt: salt
 };
  Mongo.getInstance()
  .collection('users')
  .insertOne(datas, function (err, result) {
    if(err) {
      if(err.message.indexOf('duplicate key') !== -1) {
        return res.json({
          status : false,
          message: 'Votre adresse email existe déjà'
        })
      }
      return res.json({
        status : false,
        message: err.message
      })
    }
    req.session.user = datas ;
    return res.json({
      status:true
    })
  })

});

// CONNEXION OBLIGATOIRE

// Si une session existe
router.use(function(req, res, next) {
  if(!req.session.user) {
    return next(createError(403));
  }
  return next();
});

// retourne les données à propos de me
router.get('/', function(req, res, next) {
  res.json({
    status:true,
    datas: {
      email: '',
      nom: 'Nom deFamille'
    }
  });
});

// delete
router.delete('/', function(req, res, next) {
  req.session.destroy(function(err) {
      // cannot access session here
  })
  res.json({
    status:true
  });
});

module.exports = router;
