import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<null>>(`${URL}/add-to-cart`, body)
  },

  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(URL, {
      params: {
        status: params.status
      }
    })
  },

  updateCart(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },

  buyPurchases(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },

  deletePurchases(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ delete_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
