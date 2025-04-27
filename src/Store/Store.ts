import { configureStore } from '@reduxjs/toolkit'
import  TaskSlice  from '../Features/TaskSlice/TaskSlice'


export const Store: any = configureStore({
  reducer: {
    TaskSlice:TaskSlice,
  },
})

export type AppDispatch = typeof Store.dispatch
export type RootState = ReturnType<typeof Store.getState>