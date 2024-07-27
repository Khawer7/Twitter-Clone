import React from 'react';
import CreatePosts from './CreatePosts';
import Tweets from './Tweets';
import { useSelector } from 'react-redux';


const Feeds = () => {

  const {tweets} = useSelector(store => store.tweet);

  return (
    <div className='w-[50%] border border-gray-100'>
      <CreatePosts/>
    {tweets?.map((tweet) => {
      return <Tweets key={tweet._id} tweet={tweet}/>
    })}
    </div>
  );
}

export default Feeds;
