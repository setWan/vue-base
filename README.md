# manage

基于 VUE + VUEX + VUE Router + Element UI的一套基础框架

demo ----> https://www.aituoli.com
```
- public  打包输出目录
- src
  - api  所有请求文件
  - components  公共组件
  - router  路由文件
    - _import_development.js  开发环境动态引入路由（require
    - _import_production.js  线上环境动态引入路由（import
    - index.js  静态路由、 动态提取本地路由（提取文件规则 /\.route\.js/
  - static  静态资源
  - store  vuex
    - modules  vuex模块
      - permission.js  权限模块
      - user.js  用户模块
    - getters.js  vuex公共getters
    - index.js  vuex主文件，动态提取modules所有JS
  - style  公共样式
  - utils  工具
    - asyncRoute.js  异步加载路由
    - auth.js  token
    - request.js  二次封装axios，统一处理错误、增加token等
  - views  页面组件
  - app.vue  入口文件
  - main.js  入口文件
  - permission.js  路由全局钩子
- .env.dev  开发环境配置文件
- .env.prod  线上环境配置文件
```


## 开发

```bash
# 克隆项目
git clone https://github.com/setWan/vue-base.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

浏览器访问 http://localhost:8080

## 发布

```bash
# 构建测试环境
npm run dev

# 构建生产环境
npm run build
```

