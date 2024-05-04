/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  errorMessage?: string
  classNameError?: string
  isErrorPossible?: boolean
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md',
  isErrorPossible = true,
  classNameError = 'mt-1 text-red min-h-[1.25rem] text-sm',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      {isErrorPossible && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
}
