import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import { timeSince, TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/Contants';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';
import toast from 'react-hot-toast';
import { bookmarkUpdate } from '../redux/userSlice';


const Tweets = ({tweet}) => {
  const {user} = useSelector(store => store.user);
  const dispatch = useDispatch();


  const likeOrDislikeHandler = async (id) => {
       const res  = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`,{id : user?._id },{
        withCredentials : true
       });

       dispatch(getRefresh());
   
       toast.success(res.data.message)
  };


  const deleteTweetHandler = async (id) => {
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`,{
        withCredentials: true,
      });
      console.log(res,'delete');
      dispatch(getRefresh())
      toast.success(res.data.message)
  };

  const bookmarksHandler = async (id) => {
    console.log(id,'bookmarks');
      try {
        const res = await axios.put(`${USER_API_ENDPOINT}/bookmarks/${id}`,{id : user._id},{
          withCredentials : true
        });
        console.log(res,'bookmarksHandlerRes');
        dispatch(bookmarkUpdate(id));
        toast.success(res.data.message)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
  };


  return (
    <div>
      <div className='p-4 border-b border-gray-200'>
      <div className='flex gap-1'>
      <Avatar src='https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg' size="45" round={true} />
      <div className="">
      <div className="flex items-center">
        <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
        <p className='text-gray-500 text-sm ml-2'>@{tweet?.userDetails[0]?.username} - {(timeSince(tweet.createdAt))}</p>
       </div>

       <div>
        <p>{tweet?.description}</p>
       </div>
      <div className="flex justify-between gap-20">
      <div className="flex items-center">
          <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
          <FaRegComment/>
          </div>
          <p>0</p>
       </div>
       <div className="flex items-center">
          <div onClick={() => likeOrDislikeHandler(tweet?._id)} className="p-2 hover:bg-pink-200 rounded-full cursor-pointer">
          <CiHeart size={'23px'} />
          </div>
          <p>{tweet?.like?.length}</p>
       </div>
       <div className="flex items-center">
          <div onClick={() => bookmarksHandler(tweet?._id)} className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
          <CiBookmark size={'23px'}/>
          </div>
       </div>

       <div className="flex items-center">
          {
          tweet.userId == user._id && 
                    <div onClick={()=> deleteTweetHandler(tweet._id)} className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                    <MdDeleteOutline size={'23px'}/>
                    </div>
          }

       </div>
      </div>
      </div>
       </div>
      </div>
    </div>
  );
}

export default Tweets;
