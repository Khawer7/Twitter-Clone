import React, { useEffect } from 'react';
import Avatar from 'react-avatar';
import { FaArrowLeft } from "react-icons/fa6";
import {Link, useParams} from 'react-router-dom'
import useGetProfile from '../Hooks/useGetProfile';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Contants';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';



const Profile = () => {
  const {user,profile} = useSelector((store) => store.user)
  const {id} = useParams();
  const dispatch = useDispatch();

  useGetProfile(id);

  const followAndUnfollowHandler = async () => {
     if (user?.following.includes(id)) {
      // unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`,{id : user?._id});
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);        
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
     } else {
        // follow
        try {
          axios.defaults.withCredentials = true;
          const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`,{id : user?._id});
          dispatch(followingUpdate(id));
          dispatch(getRefresh());
          toast.success(res.data.message);
        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
        }
     }
  };

  return (
    <div className='w-[50%] border-l border-r border-gray-100'>
      <div>
        <div className="flex items-center py-2">
         <Link to='/' className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
         <FaArrowLeft size={'24px'}/>
         </Link>
         <div className="">
            <h1 className='font-bold'>{profile?.name}</h1>
            <p className='text-gray-500 text-sm'>10 posts</p>
         </div>
        </div>

        <div>
            <img src="https://img.freepik.com/premium-photo/hacker-hooded-sweatshirt-glasses-banner-made-with-generative-ai_155027-3515.jpg" alt="banner" />
            <div className='absolute top-48 ml-2 border-4 border-white rounded-full'>
            <Avatar src='https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg' size="115" round={true} />
            </div>
            <div className='text-right m-4'>
             { profile?._id == user?._id ?
                <button className='border border-gray-400 px-4 py-1 hover:bg-gray-200 rounded-full'>Edit Profile</button>
                : 
                <button onClick={followAndUnfollowHandler} className='border border-gray-400 px-4 py-1 bg-black text-white rounded-full'>{user?.following.includes(id) ? 'Following' : 'Follow'}</button>
             } 
            </div>
            <div className='m-4'>
                <h1 className='font-bold text-xl'>{profile?.name}</h1>
                <p>@{profile?.username}</p>
            </div>
            <div className='m-4'>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam placeat quod eaque dolore illo quam molestiae provident non minima.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
