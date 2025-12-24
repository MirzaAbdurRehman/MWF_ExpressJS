const express = require('express')
const app = express();

const connectDb = require('../mongodb/db_connection')
connectDb();

const multer = require('multer')
const fileModel = require('../models/file_model')

const port = 4006;


// Make function to handle file uploading
const fileUpload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, '../Upload/')
        },

        filename: function(req, file, callback){
            const uniqueName = file.filename + '-' + Date.now + '-' + ".jpg"
            callback(null, uniqueName)
        }
    })
}).single('my_file')


app.post('/uploadFile', fileUpload, async (req, res) => {
    try{
        if(!req.file){
        return res.status(400).send('No file uploaded')
    }
    else{
        const newFile = new fileModel({
            filePath: req.file.path
        })

        await newFile.save()
        .then(() => res.status(200).send('File Uploaded Successfully'))
        .catch((error) => res.status(500).send('Error saving file to Database' + error))
    }
    }
    catch{
        console.log('Error Searching Employee Data:', error.message);
        console.log('Full Error:', error);
        res.status(500).send({error: 'Server Error', details: error.message})
    }
})

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})