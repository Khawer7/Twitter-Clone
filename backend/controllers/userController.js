import { User } from "../model/userSchema.js";
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";

export const Register = async (req,res) => {
   try {
    const {name,username,email,password}  = req.body;
    // Basic Validation
    if (!name || !username || !email || !password) {
        return res.status(401).json({
            message : "All fields are required",
            success : false
        })
    }

    const user = await User.findOne({email});

    if (user) {
        return res.status(401).json({
            message : "User Already exist.",
            success : false
        })
    }

    var salt = await bcrypt.genSalt(10);
    var passwordHash = await bcrypt.hash(password, salt);

    
    await User.create({
        name,username,email,password : passwordHash
    })

    return res.status(201).json({
        message : "Account created Successfully.",
        success : true
    })

   } catch (error) {
    console.log(error);
   }
};

export const Login = async (req,res) => {
    try {
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message : "All fields are required",
                success : false
            })
        }

       const user = await User.findOne({email});

       if (!user) {
        return res.status(401).json({
            message : "Incorrect password or email",
            success : false
        })
       }

       const isMatch  = await bcrypt.compare(password,user.password);

       if (!isMatch) {
        return res.status(401).json({
            message : "Incorrect password or email",
            success : false
        })
       }

       const tokenData = {
        userId : user._id
       };

       const token = jwt.sign(tokenData,process.env.Token_Secret,{expiresIn : '1d'});

       return res.status(201).cookie("token",token,{expiresIn:"1d",httpOnly :true}).json(({
        message : `Welcome back ${user.username}`,
        user,
        success : true
       }))
    } catch (error) {
        console.log(error);
    }
};

export const Logout = (req,res) => {
       return res.cookie("token","",{expiresIn : new Date(Date.now())}).json({
        message : "user logged out successfully.",
        success : true
       })
}; 

export const Bookmarks = async (req,res) => {
     const loggedInUserId = req.body.id;
     const tweetId = req.params.id;

     const user = await User.findById(loggedInUserId);

     if (user.bookmarks.includes(tweetId)) {
        // remove from bookmarks
       await User.findByIdAndUpdate(loggedInUserId,{$pull : {bookmarks : tweetId}})
        return res.status(200).json({
            message: "Remove from bookmarks."
        });
     } else {
        // save to bookmarks
    await User.findByIdAndUpdate(loggedInUserId,{$push : {bookmarks : tweetId}})
        return res.status(200).json({
            message: "Saved to bookmarks."
        });
     }
};

export const getMyProfile = async (req,res) => {
   try {
     const id = req.params.id;
     const user = await User.findById(id).select("-password");

     return res.status(200).json({
        user
     })

   } catch (error) {
    console.log(error);
   }
};

export const getOthersUser = async (req,res) => {
  try {
    const loggedInUserId = req.params.id;
    const otherUsers = await User.find({_id : {$ne : loggedInUserId} }).select("-password").limit(10);

    if (!otherUsers) {
      return res.status(401).json({
        message: "Currently does not have any users"
      })
    }

    return res.status(200).json({
        otherUsers
    })
  } catch (error) {
   console.log(error); 
  }

}; 

export const follow = async (req,res) => {
    try {
        const loggedInUserId = req.body.id; 
        const userId =  req.params.id; 

        const loggedInUser = await User.findById(loggedInUserId); 
        const user = await User.findById(userId); 

        if (!user.followers.includes(loggedInUserId)) {
            // follow
           await user.updateOne({$push : {followers : loggedInUserId}});
           await loggedInUser.updateOne({$push : {following : userId}});
        } else {
            return res.status(400).json({
                message : `User already followed to ${user.name}`
            })
        }
        
        return res.status(200).json({
            message : `${loggedInUser.name} just follow to ${user.name}`,
            success : true
        })

    } catch (error) {
        console.log(error);
    }
};

export const unfollow = async (req,res) => {
    try {
        const loggedInUserId = req.body.id; 
        const userId =  req.params.id;  

        const loggedInUser = await User.findById(loggedInUserId); 
        const user = await User.findById(userId); 

        if (loggedInUser.following.includes(userId)) {
            // unfollow
           await user.updateOne({$pull : {followers : loggedInUserId}});
           await loggedInUser.updateOne({$pull : {following : userId}});
        } else {
            return res.status(400).json({
                message : `User has not follow yet`
            })
        }

        return res.status(200).json({
            message : `${loggedInUser.name} just unfollow to ${user.name}`,
            success : true
        })

    } catch (error) {
        console.log(error);
    }
};
