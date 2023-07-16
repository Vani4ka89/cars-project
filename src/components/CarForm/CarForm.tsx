import React, {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {ICar} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../redux";

const CarForm: FC = () => {
    const {register, handleSubmit, formState: {isValid}, reset, setValue}
        = useForm<ICar>();
    const dispatch = useAppDispatch();
    const {carForUpdate} = useAppSelector(state => state.carReducer);

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
        }
    }, [dispatch, carForUpdate, setValue])

    const save: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.create({car}))
        reset()
    };

    const update: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.update({id: carForUpdate.id, car}))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(carForUpdate ? update : save)}>
            <input type="text" placeholder={'brand'} {...register('brand', {required: true})}/>
            <input type="text" placeholder={'price'} {...register('price', {required: true})}/>
            <input type="text" placeholder={'year'} {...register('year', {required: true})}/>
            <button disabled={!isValid}>{carForUpdate ? 'Update' : 'Create'}</button>
            <hr/>
        </form>
    );
};

export {CarForm};