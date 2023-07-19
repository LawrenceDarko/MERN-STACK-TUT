require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//Express app
const app = express();

// middleware
// This middleware fires at every request and logs the path and method of the request also the next will be called to move on to the next middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next()
})

// routes
// req is a request object that has info about the request being made to the server
// res is a response object that has info about what we are sending back to the client

app.use('/api/workouts', workoutRoutes);


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
            // listen for requests only when database connects
            app.listen(process.env.PORT || 4001, ()=>{
            console.log('conneted to db & listening for requests on port ', process.env.PORT,'...');
            })
    })
    .catch((err)=>{console.log(err)});




