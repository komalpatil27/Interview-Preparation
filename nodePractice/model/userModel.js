import mongoose from 'mongoose'

const userSchema =  mongoose.Schema({
    name : {
        type : String,
        require: [true , "please add contact name"]
    },
    email : {
        type : String,
        require: [true , "please add Email"]
    },
    id : {
        type : String,
        require: [true , "please add  Id"]
    },
}, {
    timeStamps : true
})

export default mongoose.model('User' , userSchema)