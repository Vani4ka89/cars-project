import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {carReducer} from "./slices/car.slice";
import {authReducer} from "./slices/auth.slice";

const rootReducer = combineReducers({
    authReducer,
    carReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export {
    setupStore
}