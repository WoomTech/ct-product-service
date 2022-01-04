import { injectable } from "inversify";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import {
  MainRouter,
  ProductRouter,
} from "./routers";
import cors from "@koa/cors";
import { mongooseLoader } from "./system";
import koaBody from "koa-body";
import helmet from 'koa-helmet';

@injectable()
export class App {
  private app: Koa;
  PORT = process.env.PORT || 8000;

  constructor(
    private mainRouter: MainRouter,
    private productRouter: ProductRouter,
  ) {
    this.app = new Koa();
    this.app.use(bodyParser());
    this.app.use(koaBody({ multipart: true, formidable: { uploadDir: './upload' }}));
    this.app.use(logger());
    this.app.use(cors());
    this.app.use(helmet());
    this.initRoutes();
  }

  private async initDatabase(): Promise<any> {
    return await mongooseLoader();
  }

  private initRoutes(): void {
    this.app.use(this.mainRouter.router.routes());
    this.app.use(this.productRouter.router.routes());
  }

  public async start(): Promise<Koa.DefaultState> {
    //await this.initDatabase();
    console.log("Database connection initialized");

    return this.app
      .listen(this.PORT, async () => {
        console.log(`Server listening on port: ${this.PORT}`);
      })
      .on("error", err => {
        console.error(err);
      });
  }
}
