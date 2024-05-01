// Controller 

const getUserdetail = (req , res) => {
    res.status(200).json({message : 'all users are listed'})
}

const postUserDetail = (req , res) => {
    console.log(req.body);
    const {id , email, name} = req.body
    if(!email || !name || !id){
        res.status(400)
        throw new Error('all fields are mandatory');
    }
    res.status(200).json({message : 'Create userDetails'})
}

const updateUserDetail = (req , res) => {
    res.status(200).json({message : `Update user details for ${req.params.id}`})
}

const deleteUserDetail = (req , res) => {
    res.status(200).json({message : `delete user detail for ${req.params.id}`})
}

const getUserdetailById = (req , res) => {
    res.status(200).json({message : `get user detail for ${req.params.id}`})
}
export {getUserdetail , postUserDetail ,updateUserDetail , deleteUserDetail, getUserdetailById}