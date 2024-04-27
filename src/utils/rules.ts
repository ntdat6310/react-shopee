import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export function getRules(getValues: UseFormGetValues<any>): Rules {
  return {
    email: {
      required: {
        value: true,
        message: 'Email là bắt buộc'
      },
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: 'Email không đúng định dạng'
      },
      minLength: {
        value: 5,
        message: 'Độ dài phải từ 5-160 kí tự'
      },
      maxLength: {
        value: 160,
        message: 'Độ dài phải từ 5-160 kí tự'
      }
    },
    password: {
      required: {
        value: true,
        message: 'Password là bắt buộc'
      },
      minLength: {
        value: 6,
        message: 'Độ dài phải từ 6-160 kí tự'
      },
      maxLength: {
        value: 160,
        message: 'Độ dài phải từ 6-160 kí tự'
      }
    },
    confirm_password: {
      validate:
        typeof getValues === 'function'
          ? (value) => value === getValues('password') || 'Confirm và password không khớp'
          : undefined
    }
  }
}
