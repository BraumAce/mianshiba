package com.yuan.mianshiba.manager;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class AiManagerTest {

    @Resource
    private AiManager aiManager;

    String userPrompt = "请生成10道10以内加减乘除的题";

    @Test
    void doChat() {
        String s = aiManager.doChat(userPrompt);
        System.out.println(s);
    }

    @Test
    void doChatWithSystemPrompt() {
        String systemPrompt = "你是人工智能助手";
        String s = aiManager.doChat(systemPrompt, userPrompt, "deepseek-v3-250324");
        System.out.println(s);
    }
}
