import { Schema, model } from "mongoose";
import { Product } from "../types";

const ImageSchema = new Schema({
  name: { type: String },
  data: { type: Buffer },
});

const LocalizationSchema = new Schema({
  name: { type: String },
  descr: { type: String },
  label: { type: String },
  url: { type: String },
});

const LocaleSchema = new Schema({
  en: { type: LocalizationSchema },
  es: { type: LocalizationSchema },
});

const SegmentationSchema = new Schema({
  domain: { type: String, required: true, enum: ["ct", "fertility"], default: "ct" },
  application: { type: Array, of: String },
});

const ProductsSchema = new Schema({
  id: { type: String, required: true },
  locale: { type: LocaleSchema },
  image: { type: ImageSchema },
  segmentation: { type: SegmentationSchema }
});

export const ProductModel = model<Product>("products", ProductsSchema);
