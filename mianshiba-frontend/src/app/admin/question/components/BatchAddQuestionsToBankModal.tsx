import { Button, Form, Modal, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { batchAddQuestionsToBankUsingPost } from "@/api/questionBankQuestionController";

interface Props {
    questionIdList?: number[];
    visible: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

/**
 * 批量向题库添加题目弹窗
 * @param props
 * @constructor
 */
const BatchAddQuestionsToBankModal: React.FC<Props> = (props) => {
    const { questionIdList = [], visible, onSubmit, onCancel } = props;
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([]);

    // 获取题库列表
    const getQuestionBankList = async () => {
        // 题库数量不多，直接全量获取
        const pageSize = 200;

        try {
            const res = await listQuestionBankVoByPageUsingPost({
                pageSize,
                sortField: "createTime",
                sortOrder: "descend",
            });
            setQuestionBankList(res.data?.records ?? []);
        } catch (e: any) {
            messageApi.error("获取题库列表失败，" + e.message);
        }
    };

    useEffect(() => {
        getQuestionBankList();
    }, []);

    /**
     * 提交
     * @param fields
     */
    const doSubmit = async (fields: API.QuestionBankQuestionBatchAddRequest) => {
        const hide = messageApi.loading("正在操作");
        const questionBankId = fields.questionBankId;
        try {
            await batchAddQuestionsToBankUsingPost({
                questionIdList,
                questionBankId,
            });
            hide();
            messageApi.success("操作成功");
            onSubmit?.();
        } catch (error: any) {
            hide();
            messageApi.error("操作失败，" + error.message);
        }
    };

    return (
        <Modal
            destroyOnClose
            title={"批量向题库添加题目"}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            {contextHolder}
            <Form
                form={form}
                style={{ marginTop: 24 }}
                onFinish={doSubmit}
            >
                <Form.Item label="选择题库" name="questionBankId">
                    <Select
                        style={{ width: "100%" }}
                        options={questionBankList.map((questionBank) => {
                            return {
                                label: questionBank.title,
                                value: questionBank.id,
                            };
                        })}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BatchAddQuestionsToBankModal;