import React, {FC} from 'react';

import {CarForm, Cars} from "../../components";
import css from './CarPage.module.css'

const CarPage: FC = () => {
    return (
        <div className={css.CarPage}>
            <CarForm/>
            <Cars/>
        </div>
    );
};

export {CarPage};