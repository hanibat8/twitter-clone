import { createSlice } from '@reduxjs/toolkit'

const initialState:{
  id: string;
  tweet: string;
  timestamp:string
}[] = []

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.unshift(action.payload)
    },
    postLiked(state, action) {
      state.unshift(action.payload)
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer