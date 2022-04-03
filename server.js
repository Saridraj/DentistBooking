const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Route files
const auth = require('./routes/auth');
const dentists = require('./routes/dentists');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app=express();

//add body parser
app.use(express.json());

//Mount routers
app.use('/api/v1/dentists',dentists);
app.use('/api/v1/auth', auth);

const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server runnig in', process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandle promise rejection
process.on('unhandleRejection' ,(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});