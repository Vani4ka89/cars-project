import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICar, IError, IPagination} from "../../interfaces";
import {carService} from "../../services/car.service";

interface IState {
    cars: ICar[];
    prev: string;
    next: string;
    error: IError;
    carForUpdate: ICar;
    trigger: boolean;
}

const initialState: IState = {
    cars: [],
    prev: null,
    next: null,
    error: null,
    carForUpdate: null,
    trigger: false
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

const update = createAsyncThunk<ICar, { id: number, car: ICar }>(
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
                const {items, prev, next} = action.payload
                state.cars = items
                state.prev = prev
                state.next = next
            })

            .addMatcher(isFulfilled(save, update, deleteCar), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isFulfilled(), state => {
                state.error = null
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