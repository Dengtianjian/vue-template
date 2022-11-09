const envMode: string = import.meta.env.MODE;

interface IConfig {
  APIURL: string,
  name: string,
}

const base: IConfig = {
  APIURL:  "http://127.0.0.22/index.php/plugin/Fanyi/v1", //* 默认的请求地址
  name: "脚手架Scaffold" //* 站点名称
}

const development: IConfig = {
  ...base
}

const production: IConfig = {
  ...base,
  APIURL: "https://j777it3u.72zhan.com"
}

const config: Record<string, IConfig> = {
  development,
  production
}

export default config[envMode];