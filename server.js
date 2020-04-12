const express = require('express')
const charityRouter = require('./routes/charity')
const donateRouter = require('./routes/donate')
const app = express()

app.set('view engine', 'ejs')

app.use('/charity', charityRouter)
app.use('/donate', donateRouter)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(7575)
