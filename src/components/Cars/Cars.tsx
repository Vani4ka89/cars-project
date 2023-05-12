import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {Car} from "../Car/Car";
import {carActions} from "../../redux";

const Cars = () => {

    const dispatch = useAppDispatch();
    const {cars, trigger} = useAppSelector(state => state.carReducer);

    useEffect(() => {
        dispatch(carActions.getAll())
    }, [dispatch, trigger])

    return (
        <div>
            {cars.map(car => <Car key={car.id} car={car}/>)}
        </div>
    );
};

export {Cars};