import { createSlice } from '@reduxjs/toolkit' 

const initialState={name:'',email:'',image:'',userId:''};

const currentUserSlice = createSlice({
    name: 'current user',
    initialState,
    reducers: {
      addCurrentUser(state,action) {
        return action.payload;
      }
    }
})

export const { addCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer