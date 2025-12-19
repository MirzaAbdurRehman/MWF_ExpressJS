

const express = require('express')
const app = express()

const connectDB =  require('../mongodb/db_connection')
connectDB()

const empModel =  require('../models/empModel')
const port = 4004;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PUT Api

app.put('/replaceUser/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const {name, email, position, department, isEliggble} = req.body;

        const updateUserData =  await  empModel.findByIdAndUpdate(
            userId,
            {name, email, position, department, isEliggble},
            {
                new: true,
                overwrite: true
            });

            if(!updateUserData){
                return res.status(404).send({message: 'User ID Not Found!...'});
            }else{
                res.send({msg: 'User Data Replaced Successfully', data: updateUserData} );
            }

    }catch(error){
        console.log('Error Replacing Employee Data:', error.message);
        console.log('Full Error:', error);
        res.status(500).send({error: 'Server Error', details: error.message})
    }
})

app.listen(port, ()=> {
    console.log(`Server is running on Port: ${port}`)
})