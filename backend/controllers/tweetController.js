import { Tweet } from "../model/tweetSchema.js";
import { User } from "../model/userSchema.js";

export const createTweet = async (req,res) => {
    const {description,id} = req.body;

    if (!description || !id) {
        return res.status(401).json({
            message : "Fields are required.",
            success : false
        })
    }

    const user = await User.findById(id).select('-password');

    await Tweet.create({
        description,
        userId : id,
        userDetails : user
    })

    return res.status(201).json({
        message: "Tweet Created Successfully",
        success : true
    })
};

export const deleteTweet = async (req,res) => {
   try {
    const {id} = req.params;

    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
        message : "Tweet deleted successfully",
        success : true
    })
   } catch (error) {
    console.log(error);
   }
};

export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id; 
        const tweetId = req.params.id;
     
        const tweet = await Tweet.findById(tweetId);
     
     if (tweet.like.includes(loggedInUserId)) {
         // dislike
         await Tweet.findByIdAndUpdate(tweetId,{$pull : {like:loggedInUserId}})  
         return res.status(200).json({
             message : "User disliked your tweet."
         }) 
     } else {
          // like
          await Tweet.findByIdAndUpdate(tweetId,{$push : {like:loggedInUserId}})  
          return res.status(200).json({
              message : "User liked your tweet."
          }) 
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAllTweets = async (req,res) => {
         try {
            const id = req.params.id; // login user id
            const loggedInUser = await User.findById(id);
            const loggedInUserTweets = await Tweet.find({userId : id});
            const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId) => {
                return Tweet.find({userId:otherUserId})
            }));

            return res.status(200).json({
                tweets: loggedInUserTweets.concat(...followingUserTweets)
            })

         } catch (error) {
            console.log(error);
         }
};

export const getFollowingTweets = async (req,res) => {
    try {
       const id = req.params.id; // login user id
       const loggedInUser = await User.findById(id);
       const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId) => {
           return Tweet.find({userId:otherUserId})
       }));

       return res.status(200).json({
        tweets: [].concat(...followingUserTweets)
       })

    } catch (error) {
       console.log(error);
    }
};

export const getBookmarksTweet = async (req,res) => {
    try {
        const id = req.params.id; // login user id
        const loggedInUser = await User.findById(id); 
        const bookmarksTweets = await Promise.all(loggedInUser.bookmarks.map((tweetId) => {
            return Tweet.find({_id : tweetId})
        }));

        return res.status(200).json({
            bookmarksTweet : [].concat(...bookmarksTweets),
            message : "Bookmarks Fetch Successfully"
        })
    } catch (error) {
       console.log(error);      
    }
};