/**
  * require express framework and using it
  */
 const express = require('express');
 const app = express();
 require('dotenv').config()
 
/**
 * connect dataBase
 */
 
const mongoDb = require("./src/config/db.config");

/**
 * require route
 */
const productRoute = require('./src/routes/product.route');
const userRoute = require('./src/routes/user.route');

/**
 * using route and body parser
 */
app.use(express.json())
app.use('/product', productRoute);
app.use('/user',userRoute)

  /**
   * to start listing on port 
   */
   const port = process.env.port || 3000;

  app.listen(port,(err,portConnected)=>{

    if(err){
        console.log("error while connecting port");
    }else{
        console.log("successful connected " + port);
    }
  })