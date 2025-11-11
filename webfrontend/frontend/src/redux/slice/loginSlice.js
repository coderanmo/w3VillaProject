import Cookies from "js-cookie";
import { createSlice} from "@reduxjs/toolkit"

let logiSlice=createSlice({
    name:'login',
    initialState:{
        user:Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) :null,
        token:Cookies.get('TOKEN') ?? ''
    },
    reducers:{
       getUser:(state,reqData)=>{
          let {payload}=reqData
          state.user=payload.data
          state.token=payload.token
          Cookies.set('USER',JSON.stringify(state.user))
          Cookies.set('TOKEN',state.token)
       },
       logOut:(state,reqData)=>{
          state.user=null
          state.token=''
          Cookies.remove('USER')
          Cookies.remove('TOKEN')
       }
    }
})

export default logiSlice.reducer
export let {getUser,logOut}=logiSlice.actions