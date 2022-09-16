import {configureStore} from "@reduxjs/toolkit";
import {api} from "../api/api"
import authReducer from "../api/authSlice"
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch