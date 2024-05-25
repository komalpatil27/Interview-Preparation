import mongoose from 'mongoose'

const userSchema =  mongoose.Schema({
    name : {
        type : String,
        required: [true , "please add contact name"]
    },
    email : {
        type : String,
        required: [true , "please add Email"]
    },
    id : {
        type : String,
        required: [true , "please add  Id"]
    },
    city : {
        type : String,
        required: [true , "please add  city"]
    },
}, {
    timestamps : true
})

export default mongoose.model('User' , userSchema)