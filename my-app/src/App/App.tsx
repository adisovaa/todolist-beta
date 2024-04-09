import React from 'react';
import '../App.css';
import {TaskType, Todolist} from '../Todolist';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useTodolists} from "./hooks/useTodolists";
import {useTasks} from "./hooks/useTasks";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const {
        tasks,
        // removeTask,
        // addTask,
        // changeStatus,
        // changeTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    } = useTasks()

    const {
        todolists,
        // setTodolists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    } = useTodolists(tasks, completelyRemoveTasksForTodolist, addStateForNewTodolist)


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return (
                                <Grid item>
                                    <Paper elevation={3} style={{padding: '20px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            //removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            //addTask={addTask}
                                            //changeTaskStatus={changeStatus}
                                            //changeTaskTitle={changeTitle}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;