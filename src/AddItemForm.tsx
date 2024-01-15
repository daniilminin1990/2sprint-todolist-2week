import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

export const AddItemForm = () => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  // Функция, отправляющая локальный стейт в глобальный (в App)
  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.addTask(newTitle, props.id);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  // Функция, создающая локальный стейт - записывающая title
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  // Функция, запускаяющая функцию addTask при нажатии на кнопку Enter
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }




  return (
    <div>
      <input value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
