const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    const donations = [{
        title: 'A Heart for Hearts',
        description: 'Helping those in need of hearts.'
    },
    {
        title: 'BarkAid', 
        description: 'Aiding dogs in shelters.'
    }]
    res.render('donation', { donations:donations })
})

module.exports = router