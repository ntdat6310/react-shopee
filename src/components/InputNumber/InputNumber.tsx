import { InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
}

export default function InputNumber({
  className,
  classNameInput = 'p-3 w-full outline-none border-[2px] border-gray-400 focus:border-gray-900 focus:shadow-sm rounded-md bg-blue-50',
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
    </div>
  )
}
