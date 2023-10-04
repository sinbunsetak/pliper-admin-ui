import {fetchApi} from "@/client/base";
import {IProductFormValue, IProductsResponse} from "@/client/sample/product";
import useSWR from "swr";
import qs from "qs";


interface IUserLoginRequest {
    id: string;
    password: string
}


// 로그인 요청
export const userLogin = (request: IUserLoginRequest) => {
    return fetchApi.post(`login`, { body: JSON.stringify(request), credentials: "include",  });
};