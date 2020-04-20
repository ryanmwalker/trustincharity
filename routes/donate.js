const express = require('express')
const router = express.Router()


/* GET donate page. */
router.get('/', function(req, res) {
    res.redirect("charitylist");
  });



module.exports = router
