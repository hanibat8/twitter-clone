import { createSlice } from '@reduxjs/toolkit'

const initialState:{
  id: string;
  content: string;
}[] = [
  { id: '1',  content: 'Hello!' },
  { id: '2', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.unshift(action.payload)
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer