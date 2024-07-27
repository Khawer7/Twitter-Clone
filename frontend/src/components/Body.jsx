import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Home';
import Profile from './Profile';
import Feeds from './Feeds';
import Login from './Login';
import Bookmarks from './Bookmarks';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element : <Home/>,
            children : [
                {
                    path : '/',
                    element : <Feeds/>
                },
                {
                    path : '/profile/:id',
                    element : <Profile/>
                },
                {
                    path : '/bookmarks',
                    element : <Bookmarks/>
                }
            ]
        },
        {
            path : '/login',
            element : <Login/>
        }
    ]);

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default Body;
