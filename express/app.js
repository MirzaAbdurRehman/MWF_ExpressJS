
const express = require('express'); // importing express js
const app = express();  // executing express js 



app.get('', (req, res) => {
    res.send('Good Morning From Express js')
})


app.get('/about', (req, res) => {
    res.send('Hello From About Page')
})

app.get('/contact', (req, res) => {
    res.send('Hello From Contact Us Page')
})


app.listen(3000)