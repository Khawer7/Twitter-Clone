import React from 'react';
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Contants';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUser, getUser } from '../redux/userSlice';
import { getAllTweet } from '../redux/tweetSlice';


const LeftSidebar = () => {

  const {user} = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
        try {
          const res = await axios.get(`${USER_API_ENDPOINT}/logout`,{
            withCredentials : true
          });
          toast.success(res.data.message);
          dispatch(getUser(null));
          dispatch(getOtherUser(null));
          dispatch(getMyProfile(null));
          dispatch(getAllTweet(null));

          navigate('/login')
        } catch (error) {
          toast.error(error?.response?.data?.message)
          console.log(error);
        }
  };

  return (
    <div className='w-[20%]'>
      <div className="">
        <img width={"27px"} className='ml-5 my-1' src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="logo" />
      </div>
      <div className="mt-4">
        <Link to='/' className="my-2 flex items-center gap-1 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
         <div className="">
         <CiHome size={'24px'} />
         </div>
            <h1 className='font-bold text-lg'>Home</h1>
        </Link>

        <div className="my-2 flex items-center gap-1 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
         <div className="">
         <CiHashtag size={'24px'} />
         </div>
            <h1 className='font-bold text-lg'>Explore</h1>
        </div>

        <div className="my-2 flex items-center gap-1 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
         <div className="">
         <IoIosNotificationsOutline size={'24px'} />
         </div>
            <h1 className='font-bold text-lg'>Notification</h1>
        </div>

        <Link to={`/profile/${user?._id}`} className="my-2 flex items-center gap-1 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
         <div className="">
         <CiUser size={'24px'} />
         </div>
            <h1 className='font-bold text-lg'>Profile</h1>
        </Link>

        <Link to='/bookmarks' className="my-2 flex items-center gap-1 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
         <div className="">
         <CiBookmark size={'24px'} />
         </div>
            <h1 className='font-bold text-lg'>Bookmarks</h1>
        </Link>

        <div onClick={logoutHandler} className="my-2 flex items-center gap-1 hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
         <div className="">
         <IoLogOutOutline size={'24px'} />
         </div>
            <h1 className='font-bold text-lg'>Logout</h1>
        </div>
        <button className='bg-blue-500 w-full text-white rounded-full py-2 px-4'>Post</button>

      </div>
    </div>
  );
}

export default LeftSidebar;
