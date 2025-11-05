

const express  = require('express');
const reqFilter = require('./middleware/reqFilter');
const app =  express();
const path = require('path')
const getPath = path.join(__dirname, '../public')

const route  = express.Router(); 
route.use(reqFilter); 

const port = 3001;


app.get('/faq', reqFilter, (req, res) => {
    res.send('This is Our Faq Page');
})

app.get('',(req,res) => {
     res.send('This is Our Home Page');
})


// Start Routing Level Middleware


route.get('/about', (req, res) =>{
    res.send('This is Our About Page');
})

route.get('/contact', (req, res) => {
    res.send('This is Our Contact Page');
})

app.use('', route);  // Thorugh this line its help for applying routing and its mean rouitng start from home page

app.use((req, res) => {
    res.sendFile(`${getPath}/pagenotfound.html`);
});



app.listen(port , () => {
    console.log(`Server is running on Port: ${port}`);
})