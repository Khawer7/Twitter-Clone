import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 tweets : null ,
 refresh : false,
 isActive : true
}

export const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    getAllTweet : (state, action) => {
        state.tweets = action.payload
      },
    getRefresh : (state) => {
      state.refresh = !state.refresh
    },
    getIsActive: (state,action) => {
      state.isActive = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getAllTweet,getRefresh,getIsActive } = tweetSlice.actions

export default tweetSlice.reducer