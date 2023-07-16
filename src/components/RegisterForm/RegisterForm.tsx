import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";

import {IAuth} from "../../interfaces";
import {authValidator} from "../../validators/auth.validator";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices";

const RegisterForm: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.authReducer)
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator)
    });

    const registerUser: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.register(user));
        if (requestStatus === 'fulfilled') {
            navigate('/login')
        }
    };

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button disabled={!isValid}>Register</button>
            {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
            {error && <div>{'this user has already exist'}</div>}
        </form>
    );
};

export {RegisterForm};