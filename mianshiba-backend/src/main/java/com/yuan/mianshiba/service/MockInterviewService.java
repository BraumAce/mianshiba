package com.yuan.mianshiba.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yuan.mianshiba.model.dto.mockInterview.MockInterviewAddRequest;
import com.yuan.mianshiba.model.dto.mockInterview.MockInterviewEventRequest;
import com.yuan.mianshiba.model.dto.mockInterview.MockInterviewQueryRequest;
import com.yuan.mianshiba.model.entity.MockInterview;
import com.yuan.mianshiba.model.entity.User;

/**
 * 模拟面试服务
 *
 * @author BraumAce
 */
public interface MockInterviewService extends IService<MockInterview> {

    /**
     * 创建模拟面试
     *
     * @param mockInterviewAddRequest
     * @param loginUser
     * @return
     */
    Long createMockInterview(MockInterviewAddRequest mockInterviewAddRequest, User loginUser);

    /**
     * 构造查询条件
     *
     * @param mockInterviewQueryRequest
     * @return
     */
    QueryWrapper<MockInterview> getQueryWrapper(MockInterviewQueryRequest mockInterviewQueryRequest);

    /**
     * 处理模拟面试事件
     *
     * @param mockInterviewEventRequest
     * @param loginUser
     * @return AI 给出的回复
     */
    String handleMockInterviewEvent(MockInterviewEventRequest mockInterviewEventRequest, User loginUser);
}
