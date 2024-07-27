import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) => {
        // Get the user from the jwt token and add id to req object
         const {token} =  req.cookies;

         if (!token) {
            return res.status(401).json({
                message : "User not authenticated",
                success : false
            })
        }

        try {
        const decode = jwt.verify(token,process.env.Token_Secret);

        console.log(decode,'decode');
        req.userId = decode.userId;
        next();
   } catch (error) {
    console.log(error);
   }
};

export default isAuthenticated;