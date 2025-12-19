const express = require('express');
const app =  express();

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('../mongodb/db_connection');
connectDB();

const empModel = require('../models/empModel');
 
const port = 4003;


// PATCH Api
// Update Data According to Id


app.patch('/updateUser/:id', async (req,  res) =>{
    try{
        const userId = req.params.id;
        const updateData =  req.body;

        const updateUserData =  await empModel.findByIdAndUpdate(
            userId,
            {$set: updateData},
            {new: true}
        );

        if(!updateUserData){
            return res.status(404).send({message: 'User ID Not Found!...'});
        }

        else{
            res.send({msg: 'User Data Updated Successfully', data: updateUserData} );
        }
    }catch(error){
        console.log('Error Updating Employee Data:', error.message);
        console.log('Full Error:', error);
        res.status(500).send({error: 'Server Error', details: error.message})
    }
})


app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
})