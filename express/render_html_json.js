

const express =  require('express'); // importing express js
const app = express();

app.get('/home', (req, res) => {
    res.send(
     `
        <h1>This is Home Page</h>
        <p>Welcome to Home Page</p>
     `
    )
})



app.get('/about', (req, res) => {
    res.send(
    [
        {name: 'John', age: 25, email: 'john@gmail.com'},
        {name: 'Jane', age: 22, email: 'jane@gmail.com'},
        {name: 'Doe', age: 30, email: 'doe@gmail.com'}
    ]
    )
})


app.listen(7500, () =>{
    console.log('Server is running on port 7500');
})
