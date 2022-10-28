import config from "../config";
import { Toast } from "vant";
import http, { IResponse } from "./http";

export type TMethods = "GET" | "POST" | "OPTIONS" | "HEAD" | "DELETE" | "PUT" | "PATCH";

export interface IPagination<Data> {
  pagination: {
    page: number,
    perPage: number,
    total: number
  }
  list: Data,
}

class Request {
  constructor(prefix: string, baseUrl: string = null, pipes = []) {
    this.#pipes = pipes;
    this.#prefix = prefix;
    this.#baseUrl = baseUrl ?? config.APIURL;
  }
  #prefix: string = "";
  #baseUrl: string = "";
  #pipes: string[] = [];

  #genUrl(uri: string | string[]): string {
    uri = Array.isArray(uri) ? uri : [uri];
    return [this.#baseUrl, this.#prefix, ...uri].filter(item => item.trim()).join("/");
  }

  static genAttachmentUrl(fileId: string): string {
    return config.APIURL + "/downloadAttachment?fileId=" + encodeURI(fileId);
  }

  pipes(pipeName: string | string[]): Request {
    this.#pipes.push(...Array.isArray(pipeName) ? pipeName : [pipeName]);
    return this;
  }
  #tokenHandle(headers: Headers): void {
    if (headers.has("Authorization")) {
      const token: string = headers.get("Authorization");
      if (token) {
        const tokenValue: string = token.slice(0, token.lastIndexOf("/"));
        const tokenExpiration: string = (Number(token.slice(token.lastIndexOf("/") + 1)) * 1000).toString();

        if (!localStorage.getItem("F_Token") || localStorage.getItem("F_Token") !== tokenValue) {
          localStorage.setItem("F_Token", tokenValue);
          localStorage.setItem("F_TokenExpiration", tokenExpiration);
        }
      } else {
        localStorage.removeItem("F_Token");
        localStorage.removeItem("F_TokenExpiration");
      }
    }
  }
  send<ResponseData>(uri: string | string[] = "", method: TMethods = "GET", query: Record<string, string> = {}, body: BodyInit | object | null = null): Promise<ResponseData> {
    if (this.#pipes.length) {
      if (method === "GET") {
        query['_pipes'] = this.#pipes.join(",");
      } else {
        if (Array.isArray(body)) {
          query['_pipes'] = this.#pipes.join(",");
        } else {
          body['_pipes'] = this.#pipes;
        }
      }
    }

    const headers = {}
    if (localStorage.getItem("F_Token")) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("F_Token")}`;
    }

    //@ts-ignore ：忽略78行导致的错误 //* 错误需要返回整个响应体
    return http<ResponseData>(this.#genUrl(uri), method, query, body, headers).then(res => {
      this.#tokenHandle(res.headers);

      if (res.result) {
        return res.data;
      }

      if (res.statusCode >= 500) {
        Toast("服务器错误");
      }


      return res;
    }).finally(() => {
      this.#pipes = [];
    });
  }

  get<ResponseData>(uri: string | string[] = "", query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "GET", query);
  }
  post<ResponseData>(uri: string | string[] = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "POST", query, body);
  }
  delete<ResponseData>(uri: string | string[] = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "DELETE", query, body);
  }
  patch<ResponseData>(uri: string | string[] = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "PATCH", query, body);
  }
  put<ResponseData>(uri: string | string[] = "", body: BodyInit | object | null = null, query: Record<string, string> = {}) {
    return this.send<ResponseData>(uri, "PUT", query, body);
  }
  upload<ResponseData = object>(uri: string, file: File, body: Record<string, string> = {}) {
    const F: FormData = new FormData();
    for (const key in body) {
      F.append(key, body[key]);
    }
    F.append("file", file);

    return this.post<ResponseData>(uri, F, {});
  }
}

/**
 * 轮询
 * @param request 请求方法
 * @param breakCallback 每次请求完后都会执行一次，如果返回 true 就会结束轮询。有两种情况会结束轮询，要么接口报错，要么该方法返回了 true
 * @param waitDuraion 每次轮询等待时长，秒级
 * @returns 响应结果
 */
export function polling<ResponseData>(request: () => Promise<ResponseData>, breakCallback: (res: ResponseData) => boolean, waitDuraion: number = 2): Promise<ResponseData> {
  let breakWhile: boolean = false;
  return new Promise(async (resolve, reject) => {
    while (breakWhile === false) {
      await new Promise<ResponseData>((resolve, reject) => {
        setTimeout(async () => {
          await request().then(res => {
            //* 如果返回结果是 truly 说明结束轮询
            breakWhile = breakCallback(res) === true;
            resolve(res);
          }).catch((err) => {
            breakWhile = true;
            reject(err);
          });
        }, waitDuraion * 1000)
      }).then(res => {
        if (breakWhile) {
          resolve(res);
        }
      }).catch(reject);
    }
  });
}

export default Request;