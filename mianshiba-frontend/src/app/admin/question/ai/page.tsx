"use client";

import { App, Button, Form, Input, InputNumber, Select, Input as AntdInput } from "antd";
import React, { useState } from "react";
import { aiGenerateQuestionsUsingPost } from "@/api/questionController";
import "./index.css";

interface Props { }

/**
 * AI 生成题目页面
 * @param props
 * @constructor
 */
const AiGenerateQuestionPage: React.FC<Props> = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string>("");
    const { message } = App.useApp();

    /**
     * 提交
     *
     * @param values
     */
    const doSubmit = async (values: API.QuestionAIGenerateRequest) => {
        const hide = message.loading("正在操作");
        setLoading(true);
        try {
            const result = await aiGenerateQuestionsUsingPost(values);
            setGeneratedContent(JSON.stringify(result, null, 2));
            hide();
            message.success("操作成功");
        } catch (e: any) {
            hide();
            message.error("操作失败，" + e.message);
        }
        setLoading(false);
    };

    return (
        <div id="aiGenerateQuestionPage">
            <h2>AI 生成题目</h2>
            <Form form={form} style={{ marginTop: 24 }} onFinish={doSubmit}>
                <Form.Item label="题目方向" name="questionType">
                    <Input placeholder="比如 Java" />
                </Form.Item>
                <Form.Item label="难度等级" name="difficulty">
                    <Select
                        placeholder="请选择难度等级"
                        options={[
                            { label: '简单', value: 'EASY' },
                            { label: '中等', value: 'MEDIUM' },
                            { label: '困难', value: 'HARD' }
                        ]}
                    />
                </Form.Item>
                <Form.Item label="题目数量" name="number">
                    <InputNumber defaultValue={10} max={50} min={1} />
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={loading}
                        style={{ width: 180 }}
                        type="primary"
                        htmlType="submit"
                    >
                        提交
                    </Button>
                </Form.Item>
                <Form.Item label="生成结果" name="generatedContent">
                    <AntdInput.TextArea
                        value={generatedContent}
                        readOnly
                        autoSize={{ minRows: 4, maxRows: 10 }}
                        placeholder="生成的题目内容将在这里显示"
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

const AppAiGenerateQuestionPage: React.FC<Props> = (props) => (
  <App>
      <AiGenerateQuestionPage {...props} />
  </App>
);

export default AppAiGenerateQuestionPage;