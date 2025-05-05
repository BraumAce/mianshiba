# 面试吧

面试吧 - 智能面试刷题平台

## 启动项目

### 后端启动

1. 启动 ElasticSearch 和 Kibana

   - ES 官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/setup.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/setup.html)

     切换到 ES 目录下，执行以下命令：

     ```
     ./bin/elasticsearch
     ```

     访问 [localhost:9200](http://localhost:9200/)，查看是否启动成功。

   - Kibana 官方文档：[https://www.elastic.co/guide/en/kibana/7.17/introduction.html](https://www.elastic.co/guide/en/kibana/7.17/introduction.html)

     切换到 Kibana 目录下，执行以下命令：

     ```
     ./bin/kibana
     ```

     访问 [localhost:5601](http://localhost:5601/)，进入 Kibana 控制台页面。

     Kibana默认是英文，可以修改配置文件 `config/kibana.yml` 中的国际化配置，在最后一行添加：

     ```
     i18n.locale: "zh-CN"
     ```
     重启即可变成中文。

3. hotkey
  
   - 先安装最新版 Etcd：[https://github.com/etcd-io/etcd/releases](https://github.com/etcd-io/etcd/releases)

     Etcd 目录下输入命令 `etcd` 启动 etcd.exe，默认占用 2379 和 2380 端口

   - MacOS 可通过 HomeBrew 下载 Etcd
  
     ```
     brew install brew

     brew services start brew

     brew services stop brew

     brew services list
     ```

   - 下载 JD-hotKey 源码：[https://gitee.com/jd-platform-opensource/hotkey](https://gitee.com/jd-platform-opensource/hotkey)
  
     在 `worker` 模块下点击 WorkerApplication 启动 hotkey worker

     在 `dashboard` 模块下点击 DashboardApplication 启动 hotkey 控制台，访问 http://127.0.0.1:8121 ，即可看到画面， 默认账号密码为 admin 和 123456

4. Sentinel

   - 官方文档：[https://sentinelguard.io/zh-cn/docs/dashboard.html](https://sentinelguard.io/zh-cn/docs/dashboard.html)

   - 下载控制台 jar 包并在本地启动：[https://github.com/alibaba/Sentinel/releases](https://github.com/alibaba/Sentinel/releases)

     ```
     java -Dserver.port=8131 -jar sentinel-dashboard-1.8.6.jar
     ```

     本地访问 [localhost:8131](http://localhost:8131/)（即启动时设置的端口）即可访问控制台，默认账号密码都是 sentinel
5. Nacos

   - 官方文档：[https://nacos.io/zh-cn/docs/nacos-config-benchmark.html](https://nacos.io/zh-cn/docs/nacos-config-benchmark.html)
  
   - 下载 Nacos Server：[https://nacos.io/download/release-history/](https://nacos.io/download/release-history/)
  
     - Linux/Unix/Mac 启动：

       ```
       sh startup.sh -m standalone
       ```

     - Windows 启动：
    
       ```
       startup.cmd -m standalone
       ```

   - 访问 [http://127.0.0.1:8848/nacos/](http://127.0.0.1:8848/nacos/) 进入控制台，默认用户名密码都是 nacos

### 前端启动

npm 下载包，再打包启动

```
npm install

npm run dev
```
