package com.yuan.mianshiba.model.dto.mockInterview;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 模拟面试消息记录
 *
 * @author BraumAce
 */
@Data
public class MockInterviewChatMessage implements Serializable {

    @Serial
    private static final long serialVersionUID = -2056799733159215147L;

    /**
     * 角色
     */
    private String role;

    /**
     * 消息内容
     */
    private String message;

}
