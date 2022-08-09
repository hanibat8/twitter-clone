import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import postsReducer from '../components/Posts/postsSlice'
import modalReducer from '../components/modalSlice'
import { apiSlice } from '../components/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    isModalOpen:modalReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);