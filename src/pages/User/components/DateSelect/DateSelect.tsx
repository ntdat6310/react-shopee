import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
  classNameError?: string
  isErrorPossible?: boolean
}

interface DateFormat {
  day: number
  month: number
  year: number
}
export default function DateSelect({
  onChange,
  value,
  errorMessage,
  isErrorPossible = true,
  classNameError = 'mt-1 text-red min-h-[1.25rem] text-sm'
}: Props) {
  const [date, setDate] = useState<DateFormat>({
    day: value?.getDate() ?? 1,
    month: value?.getMonth() ?? 0,
    year: value?.getFullYear() ?? 1900
  })

  useEffect(() => {
    setDate({
      day: value?.getDate() ?? 1,
      month: value?.getMonth() ?? 0,
      year: value?.getFullYear() ?? 1900
    })
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = {
      ...date,
      [event.target.name]: Number(event.target.value)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }

  return (
    <div className=''>
      <div className='grid grid-cols-3 gap-2'>
        <select
          name='day'
          value={date.day}
          onChange={handleChange}
          className='col-span-1 py-2 border border-gray-400 rounded-md text-center outline-none focus:border-black'
        >
          <option value='' disabled>
            Ngày
          </option>
          {range(1, 32).map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
          })}
        </select>
        <select
          name='month'
          value={date.month}
          onChange={handleChange}
          className='col-span-1 py-2 border border-gray-400 rounded-md text-center outline-none focus:border-black'
        >
          <option value='' disabled>
            Tháng
          </option>
          {range(0, 12).map((item) => {
            return (
              <option value={item} key={item}>
                {item + 1}
              </option>
            )
          })}
        </select>
        <select
          name='year'
          value={date.year}
          onChange={handleChange}
          className='col-span-1 py-2 border border-gray-400 rounded-md text-center outline-none focus:border-black'
        >
          <option value='' disabled>
            Năm
          </option>
          {range(1900, new Date().getFullYear() + 1).map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
          })}
        </select>
      </div>
      {isErrorPossible && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
}
