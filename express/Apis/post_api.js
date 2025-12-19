

const express = require('express')
const app = express()

const connectDB = require('../mongodb/db_connection')
connectDB()

const empModel = require('../models/empModel')
const port = 4002

app.use(express.json());  // Application Middleware   Purpose {this middleware is parsing the json format into objects}


// Post Api
app.post('/addUser', async (req, res) => {
    try{
        const {name, email, position, department, isEliggble} = req.body;  // Object Destructuring

        const newEmployeee =  new empModel({
            name,
            email,
            position,
            department,
            isEliggble
        });
        const savedEmployee = await newEmployeee.save();
        res.status(200).json({message: 'User Added Successfully', data: savedEmployee});
    }
    catch(error){
        console.error('Error Adding User Data:', error.message);
        res.status(500).send('Server Error');
    }
})

app.listen(port, () =>{
    console.log(`Server is running on Port: ${port}`)
})



