import express from 'express'
import { Bookmarks, follow, getMyProfile, getOthersUser, Login, Logout, Register, unfollow } from '../controllers/userController.js';
import isAuthenticated from '../config/auth.js';

const router = express.Router();

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/logout').get(isAuthenticated,Logout)
router.route('/bookmarks/:id').put(isAuthenticated,Bookmarks)
router.route('/profile/:id').get(isAuthenticated,getMyProfile)
router.route('/otheruser/:id').get(isAuthenticated,getOthersUser)
router.route('/follow/:id').post(isAuthenticated,follow)
router.route('/unfollow/:id').post(isAuthenticated,unfollow)


export default router;