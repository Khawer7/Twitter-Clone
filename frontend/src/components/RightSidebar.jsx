import React from 'react';
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';


const RightSidebar = ({otherUsers}) => {
  return (
    <div className='w-[25%]'>

      <div className="flex items-center rounded-full p-2 bg-gray-100">
       <CiSearch size={'20px'}/>
       <input type="text" className='border-none outline-none bg-transparent ml-1' placeholder='Search' />
      </div>

        <div className="p-4 bg-gray-100 my-4 rounded-2xl">
          <h1 className='font-bold'>Who to follow</h1>
      

      {otherUsers?.map((user) => {
          return <div key={user._id} className="flex items-center my-2 gap-2">
          <div>
      <Avatar src='https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg' size="45" round={true} />
       </div>
        <div>
        <h1 className='font-bold'>{user?.name}</h1>
        <p className='text-sm'>@{user?.username}</p>
        </div>
       <div>
       <Link to={`/profile/${user._id}`} className='bg-black text-white px-2 py-1 rounded-full'>Profile</Link>
       </div>
          </div>
      })}
        </div>
      
    </div>
  );
}

export default RightSidebar;
