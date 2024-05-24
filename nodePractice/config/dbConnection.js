import mongoose from 'mongoose'

const connectDb = async () => {
    try {
    const connect  = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('database connection has established' , process.env.CONNECTION_STRING)
    console.log(connect.connection.host , connect.connection.name , 'checking host and name')
    }catch(err){
        console.log('err' , err)
    }
}

export default connectDb