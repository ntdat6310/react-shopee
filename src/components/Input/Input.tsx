/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  name: string
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  errorMessage?: string
  className?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input(props: Props) {
  return (
    <div className={props.className}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.name, props.rules)}
        className='p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50'
      />
      <div className='mt-1 text-red-700 min-h-[1.25rem] text-sm'>{props.errorMessage}</div>
    </div>
  )
}
