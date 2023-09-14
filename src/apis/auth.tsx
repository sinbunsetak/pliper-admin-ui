import {fetchApi} from "@/client/base";
import {IProductFormValue, IProductsResponse} from "@/client/sample/product";
import useSWR from "swr";
import qs from "qs";


interface ICreateBannerRequest {
    location: string;
    description: string;
    height: number;
}

interface IBanner {
    bannerId: number;
    location: string;
    description: string;
    height: number;
    createdAt: string;
    items?: IBannerItem[];
}

interface IBannerItem {
    id: number;
    bannerId: number;
    imageUrl: string;
    link: string;
    alt: string;
    order: number;
}

// 배너 생성
export const createBanner = (request: ICreateBannerRequest) => {
    return fetchApi.post(`service/banner`, { body: JSON.stringify(request) });
};

//배너 조회
export const useBannerById = (bannerId: number) => {
    return useSWR<IProductsResponse>(`service/banner/${bannerId}`);
};

// 배너 아이템 생성
export const createBannerItem = (bannerId: number, formRequest: FormData) => {
    return fetchApi.post(`service/banner/${bannerId}/item`, { body: formRequest });
};