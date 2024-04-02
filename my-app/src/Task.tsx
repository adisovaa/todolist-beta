import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType): JSX.Element => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.task.id));
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, props.task.isDone, props.task.id))
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTitleStatusAC(props.task.id, newValue, props.task.id))
    },[props.task.id])

    return <>
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    </>
})