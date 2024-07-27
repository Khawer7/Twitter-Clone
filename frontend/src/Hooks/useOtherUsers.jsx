import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Contants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  getOtherUser } from '../redux/userSlice';

const useOtherUser =  (id) => {

   const dispatch = useDispatch();

     useEffect(() => {
    const fetchUser = async () => {
      try {
         const res = await axios.get(`${USER_API_ENDPOINT}/otheruser/${id}`,{
         withCredentials: true
         });
         console.log(res,'working');
         dispatch(getOtherUser(res.data.otherUsers));
      } catch (error) {
         console.log(error);
      }
    };

    fetchUser();
     }, []);
}

export default useOtherUser;
