import express from 'express';
import {getUserdetail, postUserDetail, updateUserDetail , deleteUserDetail , getUserdetailById} from '../controllers/userController';
// Express Router module
const router = express.Router();

router.route('/').get(getUserdetail).post(postUserDetail)

// router.route('/').post(postUserDetail)

router.route('/:id').put(updateUserDetail).delete(deleteUserDetail).get(getUserdetailById)

// router.route('/:id').delete(deleteUserDetail)

// router.get('/:id').get(getUserdetailById)
// With commonJs type
// module.exports = {router}
export default router;