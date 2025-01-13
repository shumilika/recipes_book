"use client"
import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from './features/recipes/recipesSlice'
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () => {
  return configureStore({
    reducer: {
      recipes: recipesReducer,
    },
  })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper <AppStore>(makeStore);