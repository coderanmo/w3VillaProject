
import React from 'react'
import store from './redux/store/store'
import { Provider } from 'react-redux'

export default function MainLayout({children}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
