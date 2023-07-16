import {IRes} from "../types";
import {ICar, IPagination} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";

class CarService {
    getAll(): IRes<IPagination<ICar[]>> {
        return axiosService.get(urls.cars)
    }

    create(car: ICar): IRes<ICar> {
        return axiosService.post(urls.cars, car)
    }

    updateById(id: number, car: ICar): IRes<ICar> {
        return axiosService.put(urls.byId(id), car)
    }

    deleteById(id: number): IRes<void> {
        return axiosService.delete(urls.byId(id))
    }

    addPhoto(id: number, photo: FormData): IRes<ICar> {
        return axiosService.put(urls.addPhoto(id), photo)
    }
}

export const carService = new CarService();