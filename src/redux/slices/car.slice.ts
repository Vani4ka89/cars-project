import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";

import {ICar} from "../../interfaces";
import {AxiosError} from "axios";
import {carService} from "../../services/car.service";
import {IError} from "../../interfaces/error.interface";

interface IState {
    cars: ICar[];
    carForUpdate: ICar;
    trigger: boolean;
    error: IError
}

const initialState: IState = {
    cars: [],
    carForUpdate: null,
    trigger: false,
    error: null
}

const getAll = createAsyncThunk<ICar[], void>(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const save = createAsyncThunk<void, { car: ICar }>(
    'carSlice/save',
    async ({car}, {rejectWithValue}) => {
        try {
            await carService.save(car)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const update = createAsyncThunk<void, { id: number, car: ICar }>(
    'carSlice/update',
    async ({id, car}, {rejectWithValue}) => {
        try {
            await carService.updateById(id, car)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteCar = createAsyncThunk<void, { id: number }>(
    'carSlice/deleteCar',
    async ({id}, {rejectWithValue}) => {
        try {
            await carService.deleteById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(save.fulfilled, state => {
                state.trigger = !state.trigger
            })
            .addCase(update.fulfilled, state => {
                state.trigger = !state.trigger
                state.carForUpdate = null
            })
            .addCase(deleteCar.fulfilled, state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload
            })
});

const {reducer: carReducer, actions} = slice;

const carActions = {
    ...actions,
    getAll,
    save,
    update,
    deleteCar
}

export {
    carReducer,
    carActions
}