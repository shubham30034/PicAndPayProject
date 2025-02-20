import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./utils/ProductSlice"
import  prizeRangeSlice from "./utils/PrizeRangeSlice"
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from '@reduxjs/toolkit'

const persistConfig ={
    key : "root",
    version : 1,
    storage
  }

  const reducer =  combineReducers({
    product:productSlice,
    prizeRange : prizeRangeSlice
  })
  
  
  const persistedReducer = persistReducer(persistConfig,reducer)
  

const store = configureStore({
    reducer: persistedReducer
})


export default store