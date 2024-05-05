import * as yup from 'yup'

export const registerSchema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài phải từ 5-160 kí tự')
    .max(160, 'Độ dài phải từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài phải từ 6-160 kí tự')
    .max(160, 'Độ dài phải từ 6-160 kí tự'),
  confirm_password: yup
    .string()
    .required('Password là bắt buộc')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const priceSchema = yup.object({
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
  date_of_birth: yup.date().max(new Date(), 'Bạn sinh ra ở tương lai à?'),
  password: registerSchema.fields['password'],
  new_password: registerSchema.fields['password'],
  confirm_password: registerSchema.fields['confirm_password']
})
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof priceSchema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
