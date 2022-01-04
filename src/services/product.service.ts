import { injectable } from "inversify";
import { isBinaryExpression } from "typescript";
import { v4 as uuidv4 } from "uuid";
import fs from "fs"
import { File } from "formidable"
import { CreateProductRequest, Product, Image } from "../types";
import { ProductModel } from "../models";

@injectable()
export class ProductService {
  constructor() {}

  public async createProduct( request: CreateProductRequest): Promise<void> {
    
    const product: Product = {
      ...request,
      id: uuidv4(),
    }
    const response = await ProductModel.create(product);
  }
  
  public async uploadPicture(productId: string, file:File ): Promise<Product> {
    const image = this.getImageData(file);
    const response = await ProductModel.findOneAndUpdate(
      { id: productId },
      image,
      {
        upsert: true,
        runValidators: true,
      }
    );
      return response;
  }

  private getImageData(file:File): Image {
    var stream = fs.readFileSync(file.path); 
    const data = Buffer.from(stream);
    const image: Image = {
      data: data,
      name: file.name
    };
    return image;
  }
}
