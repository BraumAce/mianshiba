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

   - Kibana 官方文档：[https://www.elastic.co/guide/en/kibana/7.17/introduction.html](https://www.elastic.co/guide/en/kibana/7.17/introduction.html)

      切换到 Kibana 目录下，执行以下命令：

      ```
      ./bin/kibana
      ```

3. hotkey
  
   - 先安装最新版 Etcd：[https://github.com/etcd-io/etcd/releases](https://github.com/etcd-io/etcd/releases)

     Etcd 目录下输入命令 `etcd` 启动 etcd.exe

   - 下载 JD-hotKey 源码：[https://gitee.com/jd-platform-opensource/hotkey](https://gitee.com/jd-platform-opensource/hotkey)
  
     在 `worker` 模块下点击 WorkerApplication 启动 hotkey worker

     在 `dashboard` 模块下点击 DashboardApplication 启动 hotkey 控制台，访问 http://127.0.0.1:8121 ，即可看到画面

4. Sentinel

   - 官方文档：[https://sentinelguard.io/zh-cn/docs/dashboard.html](https://sentinelguard.io/zh-cn/docs/dashboard.html)

   - 下载控制台 jar 包并在本地启动：[https://github.com/alibaba/Sentinel/releases](https://github.com/alibaba/Sentinel/releases)

     ```
     java -Dserver.port=8131 -jar sentinel-dashboard-1.8.6.jar
     ```
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

### 前端启动

npm 下载包，再打包启动

```
npm install

npm run dev
```
