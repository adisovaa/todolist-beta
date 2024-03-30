import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}


export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>

        </h3>
        <div>
            <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, t.isDone, props.id))
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTitleStatusAC(t.id, newValue, props.id))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'}
                    variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'}
                    variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
