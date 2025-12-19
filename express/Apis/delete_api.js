

const express = require('express');
const app = express();
const connectDB =  require('../mongodb/db_connection');
connectDB();
const empModel = require('../models/empModel');
const port =  3002;

app.use(express.json());  // Application Middleware   Purpose {this middleware is parsing the json format into objects}

// Delete Api to delete Data by ID

app.delete('/deleteUserData/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const deleteEmpData =  await empModel.findByIdAndDelete(userId);
        if(!deleteEmpData){
            return res.status(404).send({message: 'User ID Not Found!...'});
        }
        res.json({message: 'User Data Deleted Successfully', data: deleteEmpData});
    }catch(error){
        console.error('Error Deleting Data by ID:', error.message);
        res.status(500).send('Server Error');
    }
})

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})