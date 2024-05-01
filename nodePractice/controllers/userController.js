// Controller 

const getUserdetail = (req , res) => {
    res.status(200).json({message : 'all users are listed'})
}

const postUserDetail = (req , res) => {
    res.status(200).json({message : 'Create userDetails'})
}

const updateUserDetail = (req , res) => {
    res.status(200).json({message : `Update user deatils for ${req.params.id}`})
}

const deleteUserDetail = (req , res) => {
    res.status(200).json({message : `deelete user detail for ${req.params.id}`})
}

const getUserdetailById = (req , res) => {
    res.status(200).json({message : `deelete user detail for ${req.params.id}`})
}
export {getUserdetail , postUserDetail ,updateUserDetail , deleteUserDetail, getUserdetailById}