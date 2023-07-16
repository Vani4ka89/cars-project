import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, carReducer} from "./slices";

const rootReducer = combineReducers({
    authReducer,
    carReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppDispatch,
    AppStore
}

export {
    setupStore
}