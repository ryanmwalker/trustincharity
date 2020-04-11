const express = require('express')
const donateRouter = require('./routes/donate')
const app = express()

app.set('view engine', 'ejs')

app.use('/donate', donateRouter)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5000)