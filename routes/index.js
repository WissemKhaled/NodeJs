var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Retourner en JSOn les données liés au bouquin où l'id est dans l'url
router.get('/:id', function(req, res, next) {
  console.log('id : ' + req.params.id);
  res.json({
    title:'mon flipbook',
    pages:[
      { content : 'contenue de la page 1'},
      { content : 'contenue de la page 2'},
    ],
    description : "description",
    publisher: "Auteur",
    publishDate: ' 2020/05/10 10:30 AM'
  })
});

module.exports = router;
