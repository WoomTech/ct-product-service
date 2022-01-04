import { injectable } from "inversify";
import { TranslationModel } from "../models";
import { Translation } from "../types";

@injectable()
export class TranslationService {
  public static async getTranslationsMap(
    type: string,
    language: string,
  ): Promise<Map<string, string>> {
    const translations = await TranslationModel.find({ type: type });
    const map = new Map(translations.map(t => [t.key, t.locale[language]]));
    return map;
  }
}
