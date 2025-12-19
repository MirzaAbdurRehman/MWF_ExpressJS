
const express =  require('express');
const app = express();
const connectDB = require('../mongodb/db_connection');
const empModel = require('../models/empModel');
connectDB();
const port = 4001;


const addEmployee =  async () => {
    await empModel.create({
        name: "Areeba",
        email: "Areeba12@gmail.com",
        position: "Mid Developer",
        department: "Development",
        isEliggble: true
    });

    console.log("Employee Added");
}

addEmployee();


const getEmployee = async () => {
    try{
        const employees = await empModel.find();
        console.log(employees);
        connectDB();
    }catch(error){
        console.log("Error while fetching employee data", error);
    }
}

// getEmployee();


app.listen((port), () => {
    console.log(`Server is running on port ${port}`);
})


