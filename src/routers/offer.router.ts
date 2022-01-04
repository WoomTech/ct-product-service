import { ProductController } from "../controllers";
import { injectable } from "inversify";
import Router from "koa-router";

@injectable()
export class CatalogRouter {
  public readonly router: Router;
  //private dnsController: DnsController
  constructor(private catalogController: ProductController) {
    this.router = new Router({ prefix: "/offer" });
    this.init();
  }
  private init(): void {
    this.router.get(`/:versionId/:domain`, async ctx => {
      //await this.catalogController.getUserCatalog(ctx);
    });
    this.router.post(`/create`, async ctx => {
      //await this.catalogController.createCatalog(ctx);
    });
  }
}
