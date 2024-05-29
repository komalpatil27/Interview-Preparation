// Controller 
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
const getUserdetail = asyncHandler(async (req , res) => {
    const users = await User.find()
    if(users)
    res.status(200).json(users)
})

const postUserDetail = asyncHandler(async (req , res) => {
    console.log(req.body); 
    const {id , email, name , city} = req.body
    if(!email || !name || !id || !city){
        res.status(400)
        throw new Error('all fields are mandatory');
    }
    const user = await User.create({
        id , email, name , city
    })
    console.log(user , 'user1')
    // res.status(200).json({message : 'Create userDetails'})
    res.status(200).json(user)
})

const updateUserDetail = asyncHandler(async (req , res) => {
   
    const users = User.findById(req.params.id)
    console.log(users , 'userid ------------------------')
    if(!users){
        res.status(404);
        throw new Error('Contact Not Found')
    }
    const updatedUserDetail = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedUserDetail)
})

const deleteUserDetail = asyncHandler(async (req , res) => {
    res.status(200).json({message : `delete user detail for ${req.params.id}`})
})

const getUserdetailById = asyncHandler(async (req , res) => {
    const users = User.findById(req.params.id)
    console.log(users , 'userid ------------------------')
    if(!users){
        res.status(404);
        throw new Error('Contact Not Found')
    }
    res.status(200).json(users)
})
export {getUserdetail , postUserDetail ,updateUserDetail , deleteUserDetail, getUserdetailById}