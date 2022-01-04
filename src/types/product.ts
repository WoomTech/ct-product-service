import { Segmentation, Locale, Image } from "../types";

export class CreateProductRequest {
  locale: Locale<ProductLocalization>;
  segmentation: Segmentation
}

export interface ProductLocalization {
  name: string;
  descr: string;
  label: string 
  url: string;
}

export interface Product {
  id: string;
  locale: Locale<ProductLocalization>;
  image?: Image;
  segmentation: Segmentation;
}
