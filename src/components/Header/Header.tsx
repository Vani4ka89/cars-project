import {FC, useEffect} from 'react';
import {NavLink} from "react-router-dom";

import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices";
import {authService} from "../../services";
import logo from "../../assets/pictures/car-logo.jpg";

const Header: FC = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!me && authService.getAccessToken()) {
            dispatch(authActions.me())
        }
    }, [me, dispatch])

    return (
        <div className={css.Header}>
            <img src={logo} alt="car-logo" style={{width: "150px", height: "75px"}}/>
            {
                me ?
                    <div>
                        <div>{me.username}</div>
                        <button>Logout</button>
                    </div>
                    :
                    <div>
                        <NavLink to={'login'}>Login</NavLink>
                        <NavLink to={'register'}>Register</NavLink>
                    </div>
            }

        </div>
    )
        ;
};

export {Header};