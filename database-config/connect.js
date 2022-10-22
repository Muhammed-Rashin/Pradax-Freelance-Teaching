const mongoose = require('mongoose');
const teacherSchema = require('../models/teacher-model');

//Connecting to MongoDb using Mongoose`
mongoose.connect(process.env.DATABASE_URL,()=>{
    console.log('Connected to MongoDB')
},(err)=>{
    console.log(err)
})

