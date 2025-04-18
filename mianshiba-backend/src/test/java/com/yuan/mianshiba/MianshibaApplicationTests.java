package com.yuan.mianshiba;

import com.yuan.mianshiba.config.WxOpenConfig;
import javax.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * 主类测试
 *
 * @author BraumAce
 */
@SpringBootTest
class MianshibaApplicationTests {

    @Resource
    private WxOpenConfig wxOpenConfig;

    @Test
    void contextLoads() {
        System.out.println(wxOpenConfig);
    }

}
