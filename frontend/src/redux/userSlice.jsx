import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  otherUsers : null,
  profile : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser : (state, action) => {
      state.user = action.payload
    },
    getOtherUser : (state, action) => {
        state.otherUsers = action.payload
      },
    getMyProfile : (state, action) => {
        state.profile = action.payload
      },
   followingUpdate : (state,action) => {
    if (state.user.following.includes(action.payload)) {
      // unfollow
      state.user.following = state.user.following.filter((userId) => {
         return userId != action.payload;
      })
    } else {
      // follow
      state.user.following.push(action.payload);
    }
   },
   bookmarkUpdate : (state,action) => {
       if(state.user.bookmarks.includes(action.payload)) {
        state.user.bookmarks = state.user.bookmarks.filter((bookmarksId) => {
          bookmarksId != action.payload
        }); 
       } else {
        state.user.bookmarks.push(action.payload)
       }
   }
  },
})

// Action creators are generated for each case reducer function
export const { getUser, getOtherUser,getMyProfile,getLoad,followingUpdate,bookmarkUpdate } = userSlice.actions

export default userSlice.reducer