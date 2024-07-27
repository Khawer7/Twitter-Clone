import { useEffect } from "react";
import { TWEET_API_ENDPOINT } from "../utils/Contants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweet } from "../redux/tweetSlice";


const useGetTweet = (id) => {

    const dispatch = useDispatch();
    const {refresh,isActive,tweets} = useSelector(store => store.tweet);

   const fetchTweet  = async () => {
    try {
        const res = await axios.get(`${TWEET_API_ENDPOINT}/getalltweets/${id}`,{
            withCredentials : true
        });
        console.log(res,'useGetTweet');
        dispatch(getAllTweet(res.data.tweets))
        
    } catch (error) {
      console.log(error);   
    }
 };

 const fetchFollowingTweet  = async () => {
  try {
      const res = await axios.get(`${TWEET_API_ENDPOINT}/getfollowingtweets/${id}`,{
          withCredentials : true
      });
      console.log(res,'getfollowingtweets');
      dispatch(getAllTweet(res.data.tweets))   
  } catch (error) {
    console.log(error);   
  }
};

   useEffect(() => {
    if (isActive) {
      fetchTweet();
    } else {
      fetchFollowingTweet()
    }
   },[refresh,isActive,tweets])
}

export default useGetTweet;
