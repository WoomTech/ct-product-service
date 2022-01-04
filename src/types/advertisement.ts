import { Image, Segmentation, Tracking } from "../types";
import { Locale } from "./locale";

export interface Advertisement {
        id: string;
        type: string;
        startDate: Date;
        endDate: Date;
        order: number,
        video?: string;
        img?: string;
        locale: Locale<AdvertisementLocalization>;
        segmentation: Segmentation;
        usercases: string[];
        countries: string[];
}

export interface AdvertisementLocalization {
    client: string;
    title: string;
    subtitle: string;
    description: string;
    url: string;
}