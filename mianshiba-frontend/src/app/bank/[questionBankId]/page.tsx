"use server";

import { Avatar, Button, Card, message } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/skeleton/Paragraph";
import QuestionList from "@/components/QuestionList";
import "./index.css";

/**
 * 题库详情页面
 * @constructor
 */
export default async function BankPage({params}) {
  // 题库id
  const {questionBankId} = params;
  let bank = undefined;

  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data;
  } catch (e) {
    if (e instanceof Error) {
      message.error("获取题目列表失败：" + e.message);
    } else {
      message.error("获取题目列表失败.");
    }
  }

  // 错误处理
  if (!bank) {
    return <div>题库不存在！</div>;
  }

  // 获取第一道题目，用于 “开始刷题” 按钮跳转
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72}/>}
          title={
            <Title level={3} style={{marginBottom: 0}}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type={"secondary"}>{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{marginBottom: 16}}/>
      <QuestionList
        questionBankId={questionBankId}
        questionList={bank.questionPage?.records || []}
        cardTitle={`题目列表（${bank.questionPage?.total || 0}）`}
      />
    </div>
  );
}