import classNames from 'classnames'
import InputNumber from '../InputNumber'
import { InputNumberProps } from '../InputNumber/InputNumber'

interface Props extends InputNumberProps {
  max?: number
  classNameWrapper?: string
  value: number
  onIncrease: (value: number) => void
  onDecrease: (value: number) => void
  onType: (value: number) => void
  onFocusOut?: (value: number) => void
}

export default function QuantityController({
  max,
  value,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'flex items-center flex-wrap',
  disabled,
  onFocusOut,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }
  return (
    <div className={classNameWrapper}>
      <div className='flex items-center'>
        <button
          className={classNames(
            'flex items-center justify-center rounded-tr-md rounded-br-md border-[1px] border-gray-300 h-8 w-8',
            { 'cursor-not-allowed': value == 1 }
          )}
          onClick={decrease}
          disabled={disabled || value == 1}
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
          disabled={disabled}
          onBlur={handleBlur}
          isErrorPossible={false}
          {...rest}
        />
        <button
          className={classNames(
            'flex items-center justify-center rounded-tr-md rounded-br-md border-[1px] border-gray-300 h-8 w-8',
            { 'cursor-not-allowed': value == max }
          )}
          onClick={increase}
          disabled={disabled || value == max}
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
