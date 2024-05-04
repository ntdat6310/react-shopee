import { InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  errorMessage?: string
  classNameError?: string
  isErrorPossible?: boolean
}

export default function InputNumber({
  errorMessage,
  className,
  classNameInput = 'p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50',
  isErrorPossible = true,
  classNameError = 'mt-1 text-red min-h-[1.25rem] text-sm',
  onChange,
  ...rest
}: InputNumberProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} />
      {isErrorPossible && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
}
