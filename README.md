# OnlineJudge Front End
[![vue](https://img.shields.io/badge/vue-2.5.13-blue.svg?style=flat-square)](https://github.com/vuejs/vue)
[![vuex](https://img.shields.io/badge/vuex-3.0.1-blue.svg?style=flat-square)](https://vuex.vuejs.org/)
[![echarts](https://img.shields.io/badge/echarts-3.8.3-blue.svg?style=flat-square)](https://github.com/ecomfe/echarts)
[![iview](https://img.shields.io/badge/iview-2.8.0-blue.svg?style=flat-square)](https://github.com/iview/iview)
[![element-ui](https://img.shields.io/badge/element-2.0.9-blue.svg?style=flat-square)](https://github.com/ElemeFE/element)
[![Build Status](https://travis-ci.org/QingdaoU/OnlineJudgeFE.svg?branch=master)](https://travis-ci.org/QingdaoU/OnlineJudgeFE)

## Run

```
cd ~/zerojudge/OnlineJudgeFE/ && export TARGET=http://localhost:8020 && export NODE_OPTIONS=--openssl-legacy-provider && npm run dev
```

## Install

Install nodejs **v8.12.0** first.

### Linux

```bash
npm install
# we use webpack DllReference to decrease the build time,
# this command only needs execute once unless you upgrade the package in build/webpack.dll.conf.js
export NODE_ENV=development 
npm run build:dll

# the dev-server will set proxy table to your backend
export TARGET=http://Your-backend

# serve with hot reload at localhost:8080
npm run dev
```
### Windows

```bash
npm install
# we use webpack DllReference to decrease the build time,
# this command only needs execute once unless you upgrade the package in build/webpack.dll.conf.js
set NODE_ENV=development 
npm run build:dll

# the dev-server will set proxy table to your backend
set TARGET=http://Your-backend

# serve with hot reload at localhost:8080
npm run dev
```
## 進入正在運行的容器

```
然後執行docker exec -it {CONTAINER_NAME} /bin/sh，例如 docker exec -it oj-backend /bin/sh。
```

## 80 或 443 連接埠被佔用導致 docker 無法啟動

錯誤訊息 bind 0.0.0.0:80 failed, port is already allocated

修改 docker-compose 中 ports 相關的配置，例如 0.0.0.0:80:8080 可以修改為 0.0.0.0:8020:8080，冒號後面的連接埠號碼不會衝突請勿變更。

## 修改前端
照前面那一堆搞一搞，npm run build 就可以得到一個 dist 資料夾。

將dist 資料夾複製到伺服器上某個目錄下，例如/data/OnlineJudgeDeploy/data/backend/dist，然後修改docker-compose.yml，在oj-backend 模組中的volumes 中增加一行- /data/OnlineJudgeDeploy/ data/backend/dist:/app/dist （冒號前面的請修改為實際的路徑），然後docker-compose up -d 即可。

注意，這種修改方式將覆蓋容器內的前端文件，未來發布新版本前端的時候，請自行使用相同的方式更新。
