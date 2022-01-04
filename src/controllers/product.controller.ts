import { Context } from "koa";
import { injectable } from "inversify";
import { CatalogService } from "../services";
import { CreateCatalogRequest } from "../types";

@injectable()
export class ProductController {
  constructor(private catalogService: CatalogService) {}

  public async getProducts(ctx: Context): Promise<void> {
    const { versionId, domain } = ctx.params;
    try {
      const response = await this.catalogService.getCatalog(versionId, domain);
      ctx.status = 200;
      ctx.body = { code: 0, data: response, message: "" };
    } catch (error) {
      ctx.body = { code: 0, message: error.message };
    }
  }

  public async createProduct(ctx: Context): Promise<void> {
    const request = <CreateCatalogRequest>ctx.request.body;
    const catalog = await this.catalogService.getCatalog(1, 'domain');
    console.log(request);
    ctx.status = 200;
    ctx.body = { code: 0, data: catalog, message: "catalog created" };
  }
  public async uploadPicture(ctx: Context): Promise<void> {
    const file = ctx.request.files.file
    console.log(JSON.stringify(ctx.request.files));
    ctx.status = 200;
    ctx.body = { code: 0, data: file, message: "file saved" };
  }
}
