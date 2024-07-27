import express from "express";
import isAuthenticated from "../config/auth.js";
import { createTweet, deleteTweet, getAllTweets, getBookmarksTweet, getFollowingTweets, likeOrDislike } from "../controllers/tweetController.js";

const router = express.Router();

router.route('/create').post(isAuthenticated,createTweet);
router.route('/delete/:id').delete(isAuthenticated,deleteTweet);
router.route('/like/:id').put(isAuthenticated,likeOrDislike);
router.route('/getalltweets/:id').get(isAuthenticated,getAllTweets);
router.route('/getfollowingtweets/:id').get(isAuthenticated,getFollowingTweets);
router.route('/getbookmarkstweet/:id').get(isAuthenticated,getBookmarksTweet);


export default router;