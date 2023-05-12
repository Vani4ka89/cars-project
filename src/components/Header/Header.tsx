import React from 'react';
import {NavLink} from "react-router-dom";

import css from './Header.module.css';

const Header = () => {
    return (
        <div className={css.Header}>
            {/*<NavLink to={'cars'}>Cars</NavLink>*/}
            <NavLink to={'login'}>Login</NavLink>
            <NavLink to={'register'}>Register</NavLink>
        </div>
    );
};

export {Header};