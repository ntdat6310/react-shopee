import InputNumber from '../InputNumber'
import { InputNumberProps } from '../InputNumber/InputNumber'

interface Props extends InputNumberProps {
  max?: number
  classNameWrapper?: string
  value: number
  setValue: (value: number) => void
}

export default function QuantityController({
  max,
  value,
  setValue,
  classNameWrapper = 'flex items-center flex-wrap',
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    setValue(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    setValue(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max && _value > max) {
      _value = max
    }
    setValue(_value)
  }

  return (
    <div className={classNameWrapper}>
      <div className='flex items-center'>
        <button
          className='flex items-center justify-center rounded-tl-md rounded-bl-md border-[1px] border-gray-300 h-8 w-8'
          onClick={decrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
        <InputNumber
          classNameInput='h-8 text-center w-12 outline-none border-[1px] border-gray-300'
          onChange={handleChange}
          value={value}
          {...rest}
        />
        <button
          className='flex items-center justify-center rounded-tr-md rounded-br-md border-[1px] border-gray-300 h-8 w-8'
          onClick={increase}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    </div>
  )
}
