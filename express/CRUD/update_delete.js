const express =  require('express');
const app = express();

const connectDB =  require('../mongodb/db_connection');
connectDB();

const empModel = require('../models/empModel');

const port = 4001;
app.use(express.json());

const getEmployeeData = async () =>{
    try{
        const employeeData = await empModel.find();
        console.log(employeeData);
    }catch(error){
        console.error('Error Fetching Data: ',error)
    }
}


const updateData =  async (id, updateData) => {
    try {
        // use findByIdAndUpdate to get the updated document back
        const updated = await empModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            console.log(`No employee found with id ${id}`);
            return null;
        }

        console.log(`Update Data Successfully for ${id}:`, updated);
        return updated;
    } catch (err) {
        console.error('Error updating employee:', err);
        throw err;
    }
}


const deleteData = async (id) => {
    const deleteEmployeeData =  await empModel.findByIdAndDelete(id);
    console.log(`Delete Employee ${id}`);
}


const main = async () => {
    // await getEmployeeData();


    const empId = '690d82a581dd477e10082ac2';
    const isUpdate = {
        position: 'Senior FE',
        department: 'DPT Finance'
    }


    // await updateData(empId, isUpdate);
    // await getEmployeeData();

    await deleteData(empId);
    await getEmployeeData();



    // await updateData();
}


main();

app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
})


