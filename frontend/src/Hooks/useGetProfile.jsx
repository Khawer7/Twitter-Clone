import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Contants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/userSlice';

const useGetProfile =  (id) => {

   const dispatch = useDispatch();

     useEffect(() => {
    const fetchUser = async () => {
      try {
         const res = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`,{
         withCredentials: true
         });
         console.log(res,'working');
         dispatch(getMyProfile(res.data.user))
      } catch (error) {
         console.log(error);
      }
    };

    fetchUser();
     }, [id]);
}

export default useGetProfile;
