import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import PRODUCTS_EN from 'src/locales/en/products.json'
import HEADER_EN from 'src/locales/en/header.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import USER_EN from 'src/locales/en/user.json'
import CART_EN from 'src/locales/en/cart.json'

import PRODUCTS_VI from 'src/locales/vi/products.json'
import HEADER_VI from 'src/locales/vi/header.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import USER_VI from 'src/locales/vi/user.json'
import CART_VI from 'src/locales/vi/cart.json'

/**
 * Documentation : https://www.i18next.com/overview/typescript
 */

export const defaultNS = 'products'
export const resources = {
  en: {
    products: PRODUCTS_EN,
    header: HEADER_EN,
    product: PRODUCT_EN,
    user: USER_EN,
    cart: CART_EN
  },
  vi: {
    products: PRODUCTS_VI,
    header: HEADER_VI,
    product: PRODUCT_VI,
    user: USER_VI,
    cart: CART_VI
  }
} as const

use(initReactI18next).init({
  lng: 'vi',
  fallbackLng: 'vi',
  ns: ['products', 'header', 'product', 'user', 'cart'],
  resources,
  defaultNS
})

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}
