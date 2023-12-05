import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { authApi } from './services/authApi'
import { authApi } from './Services/authApi'
import { productApi } from './Services/productApi'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
    // getDefaultMiddleware().concat(productApi.middleware)
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)