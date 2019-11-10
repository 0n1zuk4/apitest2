var express = require('express');
var router = express.Router();

/* GET para pagina inicial. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET para  mostrar todos os clientes. */
router.get('/customers', function (req, res, next) {
    var db = require('../db');
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({}).lean().exec(function(e,docs){
        res.render('userlist', { "userlist": docs });
    });
});

/* GET para buscar um cliente. */
router.get('/search', function(req, res) {
res.render('search', { title: 'Procure um cliente' });
});

/* POST para buscar um cliente. */
router.post('/search', function (req, res) {
    var db = require('../db');
    var customerNome = req.body.nome

    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ name: customerNome }).lean().exec(function (e, docs) {
        res.json(docs);
        res.end();
    });
});


/* GET para add um novo cliente. */
router.get('/newuser', function(req, res) {
res.render('newuser', { title: 'Add New User' });
});


/* POST para um novo cliente. */
router.post('/newuser', function (req, res) {
    var db = require('../db');
    var customerName = req.body.name;
    var customerEmail = req.body.email;

    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    var newcustomer = new Customer({ name: customerName, email: customerEmail });
    newcustomer.save(function (err) {
        if (err) {
            return err;
        }
        console.log("Post saved");
            res.redirect("customers");
    });
});


/* GET para deletar um novo cliente. */
router.get('/update', function(req, res) {
res.render('update', { title: 'update' });
});

/* POST para atualizar um cliente */

router.post('/update', function (req, res, next) {
    var db = require('../db');
    var customerId = req.body.id;
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.findOneAndUpdate({ _id: customerId }, req.body, { upsert: true }, function (err, doc) {
        if (err) {
            return err;
        }
        res.redirect("customers");
    });
});

/* GET para deletar um novo cliente. */
router.get('/delete', function(req, res) {
res.render('delete', { title: 'Exclua um cliente' });
});


/* POST para deleter um cliente */

router.post('/delete', function(req, res, next){
    var db = require('../db');
    var customerId = req.body.id;
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ _id: customerId}).remove(function(err){
        if (err){
          return err;
        }
        res.redirect("customers");
    });
});

module.exports = router;
