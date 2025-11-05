

const mongoose = require('mongoose');


const ConnectionDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://maddymirza159_db_user:hoY8T1nO75O0vnYR@cluster1.g6egoef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');
        console.log('Connected to MongoDB successfully');
    }catch(error){
        console.log('Error while connecting to MongoDB', error);
    }
}

module.exports = ConnectionDB;