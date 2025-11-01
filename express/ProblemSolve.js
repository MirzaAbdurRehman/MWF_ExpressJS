

const express =require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const app = express();



app.get('', (req, res) => {
    res.sendFile(`${publicPath}/index.html`);
})

app.get('/home', (req, res) => {
    res.sendFile(`${publicPath}/home.html`)
})

app.use((req, res) => {
    res.sendFile(`${publicPath}/pagenotfound.html`);
});



app.listen(3002, ()=> {
    console.log('Server is running on port 3002');
})