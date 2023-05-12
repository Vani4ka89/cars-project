import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAuth, IErrorAuth, IUser} from "../../interfaces";
import {authService} from "../../services/auth.service";

interface IState {
    error: IErrorAuth;
    me: IUser;
}

const initialState: IState = {
    error: null,
    me: null
};

const register = createAsyncThunk<IUser, IAuth>(
    'authSlice/register',
    async (user, {rejectWithValue}) => {
        try {
            await authService.register(user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const login = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, {rejectWithValue}) => {
        try {
            await authService.login(user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder

            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload
            })

            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IErrorAuth
            })
});

const {reducer: authReducer, actions} = slice;

const authActions = {
    ...actions,
    register,
    login
}

export {
    authReducer,
    authActions
}