const express = require('express')
const router = express.Router()


/* GET charitylist page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('charities');
    collection.find({},{},function(e,docs){
        res.render('charitylist', {
            "charitylist" : docs
        });
    });
});

module.exports = router
