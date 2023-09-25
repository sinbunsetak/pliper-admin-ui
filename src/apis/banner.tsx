import {fetchApi} from "@/client/base";
import { IProduct, IProductFormValue, IProductsResponse } from "@/client/sample/product";
import useSWR from "swr";



export interface ICreateBannerRequest {
    location: string;
    description: string;
    height: number;
}

export interface IBanner {
    bannerId: number;
    location: string;
    description: string;
    height: number;
    createdAt: string;
    items?: IBannerItem[];
}

export interface IBannerItem {
    id: number;
    bannerId: number;
    imageUrl: string;
    link: string;
    alt: string;
    order: number;
}

export interface IBannerItemFormValue extends Omit<IProduct, "imageUrl"> {}

// 배너 생성
export const createBanner = (request: ICreateBannerRequest) => {
    return fetchApi.post(`banner`, { body: JSON.stringify(request) });
};

//배너 그룹 조회
export const useBanners = () => {
    return useSWR<IBanner[]>(`banner`);
};

//배너 조회
export const useBannerById = (bannerId: number) => {
    console.log("???", bannerId)
    return useSWR<IBanner>(`banner/${bannerId}`);
};

// 배너 아이템 생성
export const createBannerItem = (bannerId: number, formRequest: FormData) => {
    return fetchApi.post(`banner/${bannerId}/item`, { body: formRequest });
};

