require("dotenv").config()
'use strict'

const express = require('express') //load our app server using express
var cors = require('cors')
const app = express()
const morgan = require('morgan')
const requestIp = require('request-ip')
const Router = require("./functions/router")



app.use(requestIp.mw({ requestIp : requestIp }));


// Before anything else, handle incoming request
app.use((err, req, res, next) => {

    const clientIp = requestIp.getClientIp(req); 
    console.log(`clientIp: ${clientIp}`);

    next();
});


var allowedOrigins = ['http://localhost', 'http://localhost:4200', 'http://192.168.8.148:4200', 'http://192.168.8.141'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    console.log(origin);
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


app.use(morgan('combined')) //display access logs in console
app.use(express.json());
app.use("/api", Router);


app.listen(process.env.API_PORT, process.env.API_HOST, () => {
    console.log(`API is up and listening on ${process.env.API_PORT}...`)
})