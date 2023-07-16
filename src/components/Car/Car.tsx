import {FC, useRef, useState} from 'react';

import {ICar} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {carActions} from "../../redux";
import empty from "../../assets/pictures/empty.jpg"
import {carService} from "../../services";

interface IProps {
    car: ICar
}

const Car: FC<IProps> = ({car}) => {
    const {id, brand, price, year, photo} = car;
    const [image, setImage] = useState<string>(null);
    const dispatch = useAppDispatch();
    const filePic = useRef<HTMLInputElement>();

    const deleteCar = async () => {
        await dispatch(carActions.deleteCar({id}))
    }


    const addPhoto = async (): Promise<void> => {
        const formData = new FormData();
        const file: Blob = filePic.current.files[0];
        formData.append('photo', file);
        await carService.addPhoto(id, formData);
        setImage(URL.createObjectURL(file));
    };

    return (
        <div>
            <img src={photo || image || empty} alt={brand}
                 style={{cursor: photo || image ? 'default' : 'pointer', width: '500px'}}
                 onClick={() => filePic.current.click()}/>
            <div>id: {id}</div>
            <div>brand: {brand}</div>
            <div>price: {price}</div>
            <div>year: {year}</div>
            <button onClick={() => dispatch(carActions.setCarForUpdate(car))}>Edit</button>
            <button onClick={deleteCar}>Delete</button>
            <input type="file" accept={'image/jpeg image/png'} style={{display: "none"}} ref={filePic}
                   disabled={!!photo || !!image}
                   onChange={addPhoto}/>
            <hr/>
        </div>
    );
};

export {Car};