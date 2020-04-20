const express = require('express')
const router = express.Router()


/* GET charity page. */
router.get('/', function(req, res) {
    res.render('charity', { title: 'Apply' });
  });

module.exports = router
