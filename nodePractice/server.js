import express from 'express';
import router from './routes/userDetailsRoutes.js';
const app = express();

const port = process.env.PORT || 5000

// Without using express routes
/* app.get('/api/userdetails' , (req , res) => {
    // res.send('All users are listed')
    
    //   For json Response
    //  res.json({message : 'all users are listed'}) 

     res.status(200).json({message : 'all users are listed'})

}) */
// type : commonjs
// app.use('/api/userdetails' , require('./routes/userDetailsRoutes'))

app.use('/api/userdetails' , router)
app.listen(port, () => {
    console.log('listening on port 5000')
})