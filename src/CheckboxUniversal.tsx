import Checkbox from '@mui/material/Checkbox';
import React, { ChangeEvent } from 'react'

type CheckboxUniversal = {
  callBack: (checked: boolean) => void
  checked: boolean
}

export const CheckboxUniversal = (props: CheckboxUniversal) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.callBack(e.currentTarget.checked)
  }
  return (
    <Checkbox onChange={onChangeHandler} />
  )
}