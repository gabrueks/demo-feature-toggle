import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import phoneReducer from './phone/phone';

const reducers = combineReducers({
    user: phoneReducer
});
   
const persistConfig = {
    key: 'root',
    storage
};
   
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});
