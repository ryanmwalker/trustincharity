var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET charitylist page. */
router.get('/charitylist', function(req, res) {
    var db = req.db;
    var collection = db.get('charities');
    collection.find({},{},function(e,docs){
        res.render('charitylist', {
            "charitylist" : docs
        });
    });
});

/* POST to Add User Service */
router.post('/apply', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var name = req.body.charityname;
    var email = req.body.charityemail;
    var phone = req.body.charityphone;
    var address = req.body.charityaddress;
    var ein = req.body.charityein;

    // Set our collection
    var collection = db.get('charities');

    // Submit to the DB
    collection.insert({
        "charityname" : name,
        "charityemail" : email,
        "charityphone" : phone,
        "charityaddress" : address,
        "charityein" : ein
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {

        fs.appendFile('./charities.json', JSON.stringify(doc), (err) => {
            if (err) console.log('Error writing file:', err)
        })
            // And forward to success page
            res.redirect("charitylist");
        }
    });


});

module.exports = router;
