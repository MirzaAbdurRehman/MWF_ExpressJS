

const express = require('express');
const app = express();

const connectDB =  require('../mongodb/db_connection');
connectDB();

const empModel = require('../models/empModel');

const port = 3001;
app.use(express.json());  // Application Middleware   Purpose {this middleware is parsing the json format into objects}

// Get Api FetchAll Data

app.get('/getUserData', async (req, res) => {

    try{
        const empData = await empModel.find();
        if(!empData){
        return res.status(404).send({message: 'No Data Found!...'});
    }
    res.json(empData);
    }catch(error){
        console.error('Error Fetching Data:', error.message);
        res.status(500).send('Server Error');
    }
})


// Get Api Fetch Data by ID


app.get('/getUserData/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const empDataById = await empModel.findById(userId);
        if(!empDataById){
            return res.status(404).send({message: 'User ID Not Found!...'});
        }
        res.json(empDataById);
    }catch(error){
        console.error('Error Fetching Data by ID:', error.message);
        res.status(500).send('Server Error');
    }
})


app.listen(port, ()=> {
    console.log(`Server is running on Port: ${port}`);
})