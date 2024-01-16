import React, { ChangeEvent, useState } from "react"

type EditableSpanProps = {
  oldTitle: string
  callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanProps) => {

  const [edit, setEdit] = useState(false)
  let [newTitle, setNewTitle] = useState(props.oldTitle)

  const editFoo = () => {
    setEdit(!edit)
    if (edit) addTask()
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  // Функция, отправляющая локальный стейт в глобальный (в App)
  const addTask = () => {
    props.callBack(newTitle)
  }

  return (
    edit
      ? <input value={newTitle} onBlur={editFoo} autoFocus onChange={onChangeHandler} />
      : <span onDoubleClick={editFoo}>{props.oldTitle}</span>
  )
}