import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMove = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMove}>{props.title}</span>
})