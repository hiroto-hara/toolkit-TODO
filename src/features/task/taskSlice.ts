import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TaskState {
  idCount: number;
  tasks: { id: number; title: string; completed: boolean }[];
  selectedTask: { id: number; title: string; completed: boolean };
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "Task A", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    //taskの生成
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    //taskの編集
    editTask: (state, action) => {
      //state.tasksの中から指定したstateを選択
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //選択したtaskのtitleを編集
        task.title = action.payload.title;
      }
    },
    //taskの削除
    deleteTask: (state, action) => {
      //指定したtask以外で新くstate.tasksの配列を作成
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
    //どのtaskを選択しているか
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    //modalの開閉管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    //task完了・未完了の✔︎を変更
    completeTask: (state, action) => {
      //state.tasksの中から指定したstateを選択
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //選択したtaskのcompletedを反転
        task.completed = !task.completed;
      }
    },
  },
});

export const {
  createTask,
  editTask,
  deleteTask,
  selectTask,
  handleModalOpen,
  completeTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
