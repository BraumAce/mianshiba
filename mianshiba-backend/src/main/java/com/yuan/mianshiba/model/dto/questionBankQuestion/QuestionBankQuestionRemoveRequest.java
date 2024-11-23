package com.yuan.mianshiba.model.dto.questionBankQuestion;

import lombok.Data;

import java.io.Serializable;

/**
 * 移除题库题目关联请求
 *
 * @author BraumAce
 */
@Data
public class QuestionBankQuestionRemoveRequest implements Serializable {

    /**
     * 题库 id
     */
    private Long questionBankId;

    /**
     * 题目 id
     */
    private Long questionId;

    private static final long serialVersionUID = 1L;
}