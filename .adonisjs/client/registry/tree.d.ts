/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  products: {
    products: {
      index: typeof routes['products.products.index']
      store: typeof routes['products.products.store']
      show: typeof routes['products.products.show']
      update: typeof routes['products.products.update']
      destroy: typeof routes['products.products.destroy']
    }
  }
  orders: {
    index: typeof routes['orders.index']
    store: typeof routes['orders.store']
    show: typeof routes['orders.show']
    update: typeof routes['orders.update']
    destroy: typeof routes['orders.destroy']
  }
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
}
