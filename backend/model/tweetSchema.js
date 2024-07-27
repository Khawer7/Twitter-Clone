import mongoose from 'mongoose';
const { Schema } = mongoose;

const tweetSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   description : {
    type : String,
    required : true
   },
   like : {
    type : Array,
    default : []
   },    
   userDetails : {
    type : Array,
    default : []
   },    
},{timestamps : true});

export const Tweet = mongoose.model('Tweet',tweetSchema);