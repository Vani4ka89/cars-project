import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../redux";
import {Car} from "../Car/Car";

const Cars = () => {

    const {cars, trigger} = useAppSelector(state => state.carReducer);
    const dispatch = useAppDispatch();

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