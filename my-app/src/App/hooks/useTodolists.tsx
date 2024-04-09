import React from "react";
import {useState} from "react";
import {FilterValuesType, TodolistType} from "../App";
import {todolistId1, todolistId2} from "../id-utils";
import {v1} from "uuid";

export function useTodolists(tasks: any,
                             onTodolistRemoved: (id: string) => void,
                             onTodolistAdded: (id: string) => void
) {
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id));
        onTodolistRemoved(id)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        setTodolists([newTodolist, ...todolists])
        onTodolistAdded(newTodolistId)
    }

    return {
        todolists,
        setTodolists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }
}