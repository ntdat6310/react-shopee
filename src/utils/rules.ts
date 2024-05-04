import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  price_min: yup.string().test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Tên không được vượt quá 160 kí tự'),
  phone: yup.string().max(20, 'Số điện thoại không được vượt quá 20 chữ số'),
  address: yup.string().max(160, 'Địa chỉ không được vượt quá 160 kí tự'),
  avatar: yup.string().max(1000, 'Avatar không được vượt quá 1000 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Bạn sinh ra ở tương lai à?')
  // password: schema.fields['password'],
  // new_password: schema.fields['password'],
  // confirm_password: schema.fields['confirm_password'],
})
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
