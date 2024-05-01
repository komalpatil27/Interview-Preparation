import express from 'express';
import  {getUserdetail ,postUserDetail, updateUserDetail , getUserdetailById , deleteUserDetail}  from '../controllers/userController.js';
// Express Router module
const router = express.Router();

router.route('/').get(getUserdetail).post(postUserDetail)
router.route('/:id').put(updateUserDetail).delete(deleteUserDetail).get(getUserdetailById)

// router.route('/').post((req , res) => {
//     res.status(200).json({message : 'Create userDetails'})
// })
// router.route('/:id').put((req , res) => {
//     res.status(200).json({message : `Update user deatils for ${req.params.id}`})
// })
// router.route('/:id').get((req , res) => {
//     res.status(200).json({message : `delete user detail for ${req.params.id}`})
// })
// router.get('/:id').get((req , res) => {
//     res.status(200).json({message : `delete user detail for ${req.params.id}`})
// })
// With commonJs type
// module.exports = router
export default router;