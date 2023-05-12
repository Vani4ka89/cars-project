import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {IAuth} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices/auth.slice";

const AuthForm = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.authReducer);
    const {register, handleSubmit, formState: {isValid}} = useForm<IAuth>();

    const registerUser: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.register(user));
        if (requestStatus === 'fulfilled') {
            navigate('/login')
        }
    };

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'username'} {...register('username', {required: true})}/>
            <input type="text" placeholder={'password'} {...register('password', {required: true})}/>
            <button disabled={!isValid}>Register</button>
            {error && <div>'this user has already exist'</div>}
            <hr/>
        </form>
    );
};

export {AuthForm};