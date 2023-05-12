import {IAuth, ITokens, IUser} from "../interfaces";
import {IRes} from "../types";
import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {AxiosResponse} from "axios";

class AuthService {

    private readonly accessKey = 'access'
    private readonly refreshKey = 'refresh'

    register(user: IAuth): IRes<IUser> {
        return axiosService.post(urls.auth.register, user)
    }

    async login(user: IAuth): Promise<IUser> {
        const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.auth.login, user);
        this.setTokens(data)
        const {data: me} = await authService.me();
        return me
    }

    me(): IRes<IUser> {
        return axiosService.get(urls.auth.me)
    }

    private setTokens({access, refresh}: ITokens): void {
        localStorage.setItem(this.accessKey, access)
        localStorage.setItem(this.refreshKey, refresh)
    }

    getAccessToken(): string {
        return localStorage.getItem(this.accessKey)
    }

    deleteTokens(): void {
        localStorage.removeItem(this.accessKey)
        localStorage.removeItem(this.refreshKey)
    }
}

export const authService = new AuthService()