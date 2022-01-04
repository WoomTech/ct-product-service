import dotenv from "dotenv";
import { logger } from ".";

dotenv.config();

const user = process.env["mongo.contents.user"];
const password = process.env["mongo.contents.password"];
const authentication =
  user && password && process.env.NODE_ENV !== "test" ? `${user}:${password}@` : "";
const databaseName = "contents";
const uriParams = process.env["mongo.contentmanager.params"] || "";

export const conf = {
  mongoAddr: `mongodb://${authentication}${process.env["mongo.contentmanager.url"]}/${databaseName}${uriParams}`,
  swagger: process.env.swagger || false,
};
// ignore auth if it is test env
if (process.env.NODE_ENV == "local") {
  conf.mongoAddr = `mongodb+srv://${authentication}${process.env["mongo.contents.url-dev"]}/${databaseName}`;
}
logger.info(`Mongoose connection string - ${conf.mongoAddr}`);
