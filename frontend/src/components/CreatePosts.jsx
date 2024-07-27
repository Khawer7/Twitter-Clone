import axios from 'axios';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { timeSince, TWEET_API_ENDPOINT } from '../utils/Contants';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getIsActive, getRefresh } from '../redux/tweetSlice';

const CreatePosts = () => {

  const [description,setDescription] = useState("");
 const {user} = useSelector(store => store.user);
 const {isActive} = useSelector(store => store.tweet);

 const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(`${TWEET_API_ENDPOINT}/create`,{description,id : user?._id},{
        withCredentials : true
      });

      console.log(res,'w1');
      dispatch(getRefresh())
      if (res.data.success) {
        toast.success(res.data.message)
      }

      setDescription("")
    } catch (error) {
      console.log(error);
    }
  };

  const foryouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));

  };

  return (
    <div className=''>
      <div className="flex justify-between items-center border-b border-gray-100">
        <div onClick={foryouHandler} className={`cursor-pointer w-full text-center ${isActive ? 'border-b-4 border-blue-600' : ''}`}>
            <h1 className='font-semibold text-gray-600 text-lg hover:bg-gray-200  px-4 py-3'>For you</h1>
        </div>
        <div onClick={followingHandler} className={`cursor-pointer w-full text-center  ${!isActive ? 'border-b-4 border-blue-600' : ''}`}>
            <h1 className='font-semibold text-gray-600 text-lg hover:bg-gray-200 px-4 py-3'>Following</h1>
        </div>
      </div>

      <div className="flex gap-2 p-4">
       <div>
      <Avatar src='https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg' size="45" round={true} />
       </div>
       <input type="text" value={description} onChange={(ev) =>  setDescription(ev.target.value)} className='outline-none border-none text-lg w-full' placeholder='What is happening?'  name="" id="" />
      </div>
      <div className='text-right border-b p-4 border-gray-300'>
       <button onClick={submitHandler} className='bg-blue-400 px-6 py-1 text-white rounded-full'>Post</button>
      </div>

    </div>
  );
}

export default CreatePosts;
