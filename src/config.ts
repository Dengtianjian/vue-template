const envMode: string = import.meta.env?.MODE ?? "production";

interface IConfig {
  URL: string,
  APIURL: string,
  name: string,
  PluginId: string
}

const base: IConfig = {
  URL: "http://127.0.0.20",
  APIURL: "http://127.0.0.20/plugin.php?id=tj_emrpg", //* 默认的请求地址
  name: "脚手架Scaffold", //* 站点名称
  PluginId: "tj_emrpg"
}

const development: IConfig = {
  ...base
}

const local: IConfig = {
  ...base
}

const production: IConfig = {
  ...base,
  URL: "https://cc.emrpg.com",
  APIURL: "https://cc.emrpg.com/plugin.php?id=tj_emrpg",
  // ...base
}

const release: IConfig = {
  ...base,
  URL: "https://emrpg.com",
  APIURL: "https://emrpg.com/plugin.php?id=tj_emrpg",
}

const config: Record<string, IConfig> = {
  development,
  production,
  release,
  local
}

export default config[envMode];