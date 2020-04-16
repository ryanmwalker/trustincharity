const express = require('express')
const router = express.Router()


router.get('/charity', (req, res) => {
    
    res.render('charity')
})

module.exports = router
