

const express = require('express');
const app = express();

const connectDB = require('../mongodb/db_connection');
connectDB();

const empModel = require('../models/empModel');
const port = 4005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Search API

app.get('/searchUser/:value', async (req, res) => {
    try{
        let searchValue =  req.params.value;

        let searchResult = await empModel.find({
            "$or" : [
                {'name': {$regex: searchValue, $options: 'i'}},
                {'email': {$regex: searchValue, $options: 'i'}},
                {'position': {$regex: searchValue, $options: 'i'}},
                {'department': {$regex: searchValue, $options: 'i'}},
            ]
        });

        res.send({msg: 'Your Searching Data', data: searchResult} );

    }catch(error){
        console.log('Error Searching Employee Data:', error.message);
        console.log('Full Error:', error);
        res.status(500).send({error: 'Server Error', details: error.message})
    }
})

app.listen(port, ()=> {
      console.log(`Server is running on Port: ${port}`)
})