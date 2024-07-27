import React, { useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import Feeds from './Feeds';
import RightSidebar from './RightSidebar';
import {Outlet, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import useOtherUser from '../Hooks/useOtherUsers';
import useGetTweet from '../Hooks/useGetTweet';

const Home = () => {

// Custom hooks
 const {user,otherUsers} = useSelector(store => store.user);
 const navigate =  useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login')
     }
  },[])

  useOtherUser(user?._id);
  useGetTweet(user?._id);
  

  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar />
       <Outlet/>
      <RightSidebar otherUsers={otherUsers}/>
    </div>
  );
}

export default Home;
