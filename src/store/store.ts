import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSLice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})
export type TootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;