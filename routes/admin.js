var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Mongo = require('../bin/mongo');

router.get('/', function(req, res, next) {
    if(req.session.user) {
        return next();
    }
    res.render('admin/index', { title: "hello admin"} );
})

router.use(function(req, res, next) {
    if (!req.session) {
        return next(createError(403));
    }
        return next()
})

router.get('/', function(req, res, next) {
  res.render('admin/dashboard', { title: "page de co"} );
});

router.post('/', function(req, res, next) {
    let datas = {
        title : req.body.title,
        author: req.body.author,
        description : req.body.description,
        pdf: req.body.pdf
      };
    Mongo.getInstance()
    .collection('book')
    .insertOne(datas, function (err, result) {
      if(err) {
        return res.json({
          status : false,
          message: err.message
        })
      }
      return res.json({
        status:true
      })
    })

})

router.get('/:id', function(req, res, next) {
    res.json( {
        status: true,
        data : {

        }
    });
})

router.put('/', function(req, res, next) {
    res.json({
      status:true
    });
});

router.delete('/', function(req, res, next) {

    res.json({
      status:true
    });
});
module.exports = router;
