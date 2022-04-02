const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app=express();

app.get('/',(req,res) => {
    res.status(200).json({success:true, data:{id:1}});
});

const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server runnig in', process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandle promise rejection
process.on('unhandleRejection' ,(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});