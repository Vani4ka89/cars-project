import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {ICar} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../redux";

const CarForm = () => {

    const dispatch = useAppDispatch();
    const {carForUpdate} = useAppSelector(state => state.carReducer);
    const {
        register, handleSubmit, setValue, formState: {
            errors, isValid
        }, reset
    } = useForm<ICar>({mode: 'all'});

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand, {shouldValidate: true})
            setValue('price', carForUpdate.price, {shouldValidate: true})
            setValue('year', carForUpdate.year, {shouldValidate: true})
        }
    }, [dispatch, carForUpdate, setValue])

    const save: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.save({car}))
        reset()
    };

    const update: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.update({id: carForUpdate.id, car}))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(carForUpdate ? update : save)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'price'} {...register('price')}/>
            <input type="text" placeholder={'year'} {...register('year')}/>
            <button disabled={!isValid}>{carForUpdate ? 'Update' : 'Save'}</button>
            {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
            <hr/>
        </form>
    );
};

export {CarForm};