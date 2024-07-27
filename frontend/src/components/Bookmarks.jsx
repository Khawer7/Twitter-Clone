import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TWEET_API_ENDPOINT } from '../utils/Contants';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Tweets from './Tweets';
import { getRefresh } from '../redux/tweetSlice';

const Bookmarks = () => {

    const {user} = useSelector(store => store.user);
    const {tweets} = useSelector(store => store.tweet);

    const [bookmarks, setBookmarks] = useState(null);
    const dispatch = useDispatch();

    const fetchBookmarksTweet = async () => {
       try {
        const res = await axios.get(`${TWEET_API_ENDPOINT}/getbookmarkstweet/${user._id}`,{
            withCredentials : true
        });
        setBookmarks(res.data.bookmarksTweet)
        
       } catch (error) {
        toast.error(error.response.data.message);  
       }
    };

    useEffect(() => {
    fetchBookmarksTweet();
    }, [user.bookmarks,tweets]);

  return (
    <div>
        <h2 className='text-center text-3xl font-bold my-10'>Bookmark Tweets</h2>
      {bookmarks?.length == 0 && <p className='text-center'>There is no Bookmarks</p>}
      {bookmarks?.map((tweet) => {
        return <Tweets key={tweet._id} tweet={tweet} />
      })}
    </div>
  );
}

export default Bookmarks;
