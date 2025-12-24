

const express = require('express');
const app = express();

const connectDB = require('../mongodb/db_connection')
connectDB();

const userModel = require('../models/authModel')

const bcryt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const secretKey = 'pmtz@08c2'

app.use(express.json())

const port = 4008;


// Sign Up Api

app.post('/signUp', async (req, res) => {
    
    const { userName, email, password, address, phone } =  req.body;

    try{
        
        const existingUser = await userModel.findOne({$or: [{email},{phone}]});
        if(existingUser){
            return res.status(400).json({message: "User Already Exist"});
        }

        const newUser = new userModel({
            userName,
            email,
            password,
            address,
            phone
        })

        await newUser.save();
        const token = jwt.sign({_id: newUser._id, email: newUser.email}, secretKey, {expiresIn: '5d'});
        console.log(`Generated Token: ${token}`);

        res.json({
            message: "User Registered Successfully",
            token,
            user: {
                id: newUser._id,
                UserName: newUser.userName,
                Email: newUser.email,
                Address: newUser.address,
                Phone: newUser.phone
            }
        })
    } catch(error) {
        console.log('Error Searching Employee Data:', error.message);
        console.log('Full Error:', error);
        res.status(500).send({error: 'Server Error', details: error.message})
    }
})


// login Api

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{

        const userExist = await userModel.findOne({email});
        if(!userExist){
            return res.status(404).json({message: "User Not Found"})
        }

        const isMatch = await bcryt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalifd Credentials"})
        }

        const token = jwt.sign({_id: userExist._id, email: userExist.email}, secretKey, {expiresIn: '5d'});
          res.json({
            message: "Login Successfully",
            token,
            user: {
                id: userExist._id,
                UserName: userExist.userName,
                Email: userExist.email,
                Address: userExist.address,
                Phone: userExist.phone
            }
        })

    }catch(error){
        console.log('Error Searching Employee Data:', error.message);
        console.log('Full Error:', error);
        res.status(500).send({error: 'Server Error', details: error.message})
    }
    
})


const extractToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];
    if(!bearerHeader){
        return res.status(401).json({message: "Access Denied: Token is missing or Invalid"})
    }

    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
}



app.post('/protected', extractToken, (req, res) => {

    jwt.verify(req.token, secretKey, (error, authData) => {
        if(error){
            return res.status(403).json({message: "Unauthorized Invalid Token"})
        }else{
            res.status(200).json({
                message: 'You are Authorized User',
                authData
            })
        }
    })
})


app.listen(port, ()=> {
      console.log(`Server is running on Port: ${port}`)
})


