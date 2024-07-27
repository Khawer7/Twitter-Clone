import React, { useState } from 'react';
import { USER_API_ENDPOINT } from '../utils/Contants';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux'
import { getUser } from '../redux/userSlice';


const Login = () => {

    const [isLogin,setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const loginSignupHandler = () => [
      setIsLogin(!isLogin)
    ];

    const submitHandler = async (ev) => {
      ev.preventDefault();

      if (isLogin) {
        try {
          const res = await axios.post(`${USER_API_ENDPOINT}/login`,{email,password},{
            headers : {
              'Content-Type' : 'application/json'
            },
            withCredentials : true
          });

          dispatch(getUser(res.data.user))
          if (res.data.success) {
            toast.success(res.data.message);
            navigate('/');
          }
        } catch (error) {
         toast.error(error.response.data.message);
        }
        
      } else {
        try {
          const res = await axios.post(`${USER_API_ENDPOINT}/register`,{name,username,email,password},{
            headers : {
              'Content-Type' : 'application/json'
            },
            withCredentials : true
          });
          console.log(res);
          if (res.data.success) {
            toast.success(res.data.message);
            setIsLogin(true);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }


    };
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
     <div className='flex items-center justify-evenly w-[80%]'>
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" width={'300px'} alt="logo" />
        </div>
        <div>
            <div className="my-5">
                <h1 className='font-bold text-6xl'>Happening now.</h1>
            </div>
            <h1 className='font-bold text-2xl mt-4 mb-2'>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={submitHandler} className='flex flex-col w-[50%]'>
              {!isLogin && (
                <>
                <input type="text" placeholder='Name' value={name} onChange={(ev) => setName(ev.target.value)} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1' />
                <input type="text" placeholder='Username' value={username} onChange={(ev) => setUsername(ev.target.value)}  className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1' />
              </>
              )}
                <input type="email" placeholder='Email' onChange={(ev) => setEmail(ev.target.value)}  value={email} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1' />
                <input type="password" onChange={(ev) => setPassword(ev.target.value)}  placeholder='Password' value={password} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1' />
                <button className='bg-blue-500 py-2 rounded-full text-white my-4'>{isLogin ?  'Login' : 'Create Account'}</button>
                <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span className='font-bold text-blue-500 cursor-pointer' onClick={loginSignupHandler}>{isLogin ? 'Register': 'Login'}</span></h1>
            </form>
        </div>
     </div>
    </div>
  );
}

export default Login;
