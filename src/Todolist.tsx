import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Button, IconButton } from '@mui/material';
// import { Fingerprint } from '@mui/icons-material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTodolistHandler = (title: string) => {
        props.updateTodolist(props.id, title)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler} />
            {/* Подключим materualUI */}
            <Button variant="contained" onClick={removeTodolist}>X</Button>
            {/* <button onClick={removeTodolist}>x</button> */}
        </h3>
        <IconButton aria-label="fingerprint" color="secondary">
            <Fingerprint />
        </IconButton>
        <AddItemForm callBack={addTaskHandler} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    const updateTaskHandler = (title: string) => {
                        props.updateTask(props.id, t.id, title)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/* <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} /> */}
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} />
                        <EditableSpan oldTitle={t.title} callBack={updateTaskHandler} />
                        {/* <span>{t.title}</span> */}
                        {/* <button onClick={onClickHandler}>x</button> */}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : "contained"} color='success' onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : "contained"} color='error' onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : "contained"} color='primary' onClick={onCompletedClickHandler}>Completed</Button>
            {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </button> */}
        </div>
    </div>
}


