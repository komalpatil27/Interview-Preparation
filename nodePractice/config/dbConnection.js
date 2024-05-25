import mongoose from 'mongoose'

const connectDb = async () => {
    console.log('database log')
    try {
        console.log(process.env.CONNECTION_STRING , 'string')
    const connect  = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('database connection has established' , process.env.CONNECTION_STRING)
    console.log(connect.connection.host , connect.connection.name , 'checking host and name')
    }catch(err){
        console.log('err' , err)
    }
}

export default connectDb