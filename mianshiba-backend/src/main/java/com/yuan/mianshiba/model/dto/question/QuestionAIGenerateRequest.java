package com.yuan.mianshiba.model.dto.question;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * AI 生成题目请求
 *
 * @author BraumAce
 */
@Data
public class QuestionAIGenerateRequest implements Serializable {

    /**
     * 题目类型，比如 Java
     */
    private String questionType;

    /**
     * 题目数量，比如 10
     */
    private int number = 20;

    @Serial
    private static final long serialVersionUID = 1L;
}
