import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
   openTaskCreationModal: false as boolean,
   taskList: [] as any,
   editTaskModal:false as boolean,
   editSeletedTask:'',
   viewParticularTaskModal:"",
   switchToDashBoard:false as boolean,
}

export const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState,
  reducers: {
    setOpenTaskCreationModal: (state, { payload }: PayloadAction<boolean>) => {
        state.openTaskCreationModal = payload;
      },
    setTaskList: (state, { payload }: PayloadAction<any>) => {
        state.taskList.push(payload);
      },
      setDeleteTask: (state, { payload }: PayloadAction<any>) => {
        state.taskList = state.taskList.filter((item:any) => item.id !== payload);
      },
    setUpdateTask: (state, { payload }: PayloadAction<any>) => {
      const updateTaskList = state.taskList.findIndex((item:any) => item.id === payload.id);
      if (updateTaskList !== -1) state.taskList[updateTaskList] = payload;
      },
    setEditTaskModal: (state, { payload }: PayloadAction<any>) => {
      state.editTaskModal = payload;
      },
    setEditSeletedTask: (state, { payload }: PayloadAction<any>) => {
      state.editSeletedTask = payload;
      },
    setViewParticularTaskModal: (state, { payload }: PayloadAction<any>) => {
      state.viewParticularTaskModal = payload;
      },
    setSwitchToDashBoard: (state, { payload }: PayloadAction<any>) => {
      state.switchToDashBoard = payload;
      },
  }
})

export const {setOpenTaskCreationModal,setTaskList,setEditTaskModal,setEditSeletedTask,setUpdateTask,setDeleteTask,setViewParticularTaskModal,setSwitchToDashBoard } = TaskSlice.actions

export default TaskSlice.reducer;