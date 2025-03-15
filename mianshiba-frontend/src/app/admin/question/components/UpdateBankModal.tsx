import {
  addQuestionBankQuestionUsingPost,
  listQuestionBankQuestionVoByPageUsingPost,
  removeQuestionBankQuestionUsingPost
} from "@/api/questionBankQuestionController";
import { Form, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 更新题目所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([]);

  // 获取所属题库列表
  const getCurrentQuestionBankIdList = async () => {
    try {
      const res = await listQuestionBankQuestionVoByPageUsingPost({
        questionId,
        pageSize: 20,
      })
      const list = (res.data?.records ?? []).map(item => item.questionBankId);
      form.setFieldValue("questionBankIdList" as any, list);
    } catch (e: any) {
      messageApi.error("获取题目所属题库列表失败：" + e.message);
    }
  }

  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
  }, [getCurrentQuestionBankIdList, questionId]);

  // 获取题库列表
  const getQuestionBankList = async () => {
    // 全量获取题库列表
    const pageSize = 200;

    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      })
      setQuestionBankList(res.data?.records ?? []);
    } catch (e: any) {
      messageApi.error("获取题库列表失败：" + e.message);
    }
  }

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      destroyOnClose
      title={'更新题目所属题库'}
      open={visible}
      onCancel={() => {
        onCancel?.();
      }}
    >
      {contextHolder}
      <Form form={form} style={{ marginTop: 24 }}>
        <Form.Item label="所属题库" name="questionBankIdList">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            options={
              questionBankList.map(questionBank => {
                return {
                  label: questionBank.title,
                  value: questionBank.id,
                }
              })
            }
            onSelect={async (value) => {
              const hide = messageApi.loading("正在更新");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                messageApi.success("绑定题库成功");
              } catch (e: any) {
                hide();
                messageApi.error("绑定题库失败，" + e.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = messageApi.loading("正在更新");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                messageApi.success("取消绑定题库成功");
              } catch (e: any) {
                hide();
                messageApi.error("取消绑定题库失败，" + e.message);
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default UpdateBankModal;