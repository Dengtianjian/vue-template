import Request, { TMethods } from "./Request";

class DiscuzXRequest extends Request {
  #prefix: string = "";
  constructor(prefix: string, baseUrl: string = null, pipes = []) {
    super("", baseUrl, pipes);
    this.#prefix = prefix;
  }
  send<ResponseData>(uri: string | string[] = "", method: TMethods = "GET", query: Record<string, string> = {}, body: BodyInit | object | null = null): Promise<ResponseData> {
    return super.send(uri, method, query, body, {
      "x-client": "dashboard"
    });
  }
}

export default DiscuzXRequest;