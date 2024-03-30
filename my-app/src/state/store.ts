import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

// type AppRootState = {
//     todolist: Array<TodolistType>
//     tasks: TasksStateType
// }


export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;



