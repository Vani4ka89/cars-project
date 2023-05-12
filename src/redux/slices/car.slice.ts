import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";

import {ICar, IPagination} from "../../interfaces";
import {AxiosError} from "axios";
import {carService} from "../../services/car.service";
import {IError} from "../../interfaces";

interface IState {
    cars: ICar[];
    prev: string;
    next: string;
    carForUpdate: ICar;
    trigger: boolean;
    error: IError
}

const initialState: IState = {
    cars: [],
    prev: null,
    next: null,
    carForUpdate: null,
    trigger: false,
    error: null
}

const getAll = createAsyncThunk<IPagination<ICar[]>, void>(
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
                const {prev, next, items} = action.payload;
                state.cars = items
                state.prev = prev
                state.next = next
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