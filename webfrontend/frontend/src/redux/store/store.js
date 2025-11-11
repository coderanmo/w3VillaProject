import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slice/loginSlice'

let  store = configureStore({
  reducer: {
    login:loginReducer
  },
})
export default store