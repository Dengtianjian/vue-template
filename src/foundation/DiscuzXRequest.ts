import config from "../config";
import Request, { TMethods } from "./Request";

export interface IUploadResult {
  path: string,
  extension: string,
  sourceFileName: string,
  saveFileName: string,
  size: number,
  fullPath: string,
  aid: number,
  tableId: number,
  tableName: string,
  dzAidEncode: string,
  downloadEncode: string,
}

class DiscuzXRequest extends Request {
  #prefix: string = "";
  constructor(prefix: string, baseUrl: string = null, pipes = []) {
    super("", baseUrl, pipes);
    this.#prefix = prefix;
  }
  send<ResponseData>(uri: string | string[] = "", method: TMethods = "GET", query: Record<string, string> = {}, body: BodyInit | object | null = null): Promise<ResponseData> {
    uri = Array.isArray(uri) ? uri : [uri];
    query['uri'] = [this.#prefix, ...uri].filter(item => item.trim()).join("/");
    return super.send("", method, query, body);
  }

  static genViewAttachmentURL(fileFullPath: string) {
    return `${config.URL}/${fileFullPath}`;
  }
}

export default DiscuzXRequest;