import { createSlice } from '@reduxjs/toolkit';
import { initialTasks } from '../initialTaskValues';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasks,
  reducers: {
    createTask: (state, action) => {
      state.push({ ...action.payload, id: state.length + 1 });
    },
    updateTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    }
  }
});

export const { createTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;