import { ProductController } from "../controllers";
import { injectable } from "inversify";
import Router from "koa-router";

@injectable()
export class ProductRouter {
  public readonly router: Router;
  //private dnsController: DnsController
  constructor(private productController: ProductController) {
    this.router = new Router({ prefix: "/product" });
    this.init();
  }
  private init(): void {
    this.router.get(`/`, async ctx => {
      await this.productController.getProducts(ctx);
    });
    this.router.post(`/create`, async ctx => {
      await this.productController.createProduct(ctx);
    });
    this.router.post(`/upload/:productId`, async ctx => {
      await this.productController.uploadPicture(ctx);
    });
  }
}
