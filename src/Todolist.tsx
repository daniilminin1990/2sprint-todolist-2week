import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { CheckboxUniversal } from './CheckboxUniversal';
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
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
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

    const updateTodolistTitleHandler = (title: string) => {
        props.updateTodolistTitle(props.id, title)
    }

    const changeTaskStatusHandler = (tID: string, checked: boolean) => {
        props.changeTaskStatus(tID, checked, props.id);
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler} />
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

                    const updateTaskTitleHandler = (title: string) => {
                        props.updateTaskTitle(props.id, t.id, title)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/* <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} /> */}
                        <CheckboxUniversal callBack={(checked) => changeTaskStatusHandler(t.id, checked)} checked={t.isDone} />
                        <EditableSpan oldTitle={t.title} callBack={updateTaskTitleHandler} />
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


