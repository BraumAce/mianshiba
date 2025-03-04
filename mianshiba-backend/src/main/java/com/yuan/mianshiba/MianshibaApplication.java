package com.yuan.mianshiba;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 主类（项目启动入口）
 *
 * @author BraumAce
 */
@SpringBootApplication
@MapperScan("com.yuan.mianshiba.mapper")
@EnableScheduling
@EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true)
public class MianshibaApplication {

    public static void main(String[] args) {
        SpringApplication.run(MianshibaApplication.class, args);
    }

}
