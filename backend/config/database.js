import mongoose from "mongoose";

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to Mongodb");
    }).catch((error) => {
        console.log(error);
    })
};


export default databaseConnection;
