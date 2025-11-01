

const express =  require('express');
const path = require('path')
const app = express();
const getPath = path.join(__dirname, '../public')
const port = 4000;

app.set('view engine', 'ejs');

app.get('/welcome', (req, res) => {
 const empInfo = {
    name: 'Irteza',
    id: 11786,
    // Insert the fav list here:
    fav: ['coding', 'reading', 'traveling'] 
}
    res.render('welcome', {empInfo})  // change file name or get file name here
});

app.use((req, res) => {
    res.sendFile(`${getPath}/pagenotfound.html`);
});

app.listen(port, () => {
     console.log('Server is running on port 4000');
})
