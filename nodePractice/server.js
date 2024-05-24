import express, { json } from 'express';
import router from './routes/userDetailsRoutes.js';
import errorhandler from './middleware/errorHandler.js';
import connectDb from './config/dbConnection.js';
import dotenv from 'dotenv'
const app = express();
// dotenv.config();
const port = process.env.PORT || 5000
// connectDb()
// Without using express router
/* app.get('/api/userdetails' , (req , res) => {
    // res.send('All users are listed')
    
    //   For json Response
    //  res.json({message : 'all users are listed'}) 

     res.status(200).json({message : 'all users are listed'})

}) */
// type : commonjs
// app.use('/api/userdetails' , require('./routes/userDetailsRoutes'))
// whenever we need to accept data from client to server we need to parse the json body
// Inbuilt middleare for json object id express.json()
app.use(express.json())
app.use('/api/userdetails' , router)
app.use(errorhandler)
app.listen(port, () => {
    console.log('listening on port 5000')
})