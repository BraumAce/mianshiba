"use server";

import { Flex, Menu, message } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import "./index.css";
import Link from "next/link";
import QuestionCard from "@/components/QuestionCard";

/**
 * 题库题目详情页面
 * @constructor
 */
export default async function BankQuestionPage({ params }) {
  // 题库id、题目id
  const { questionBankId, questionId } = params;
  let bank = undefined;
  let question = undefined;

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

  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e) {
    if (e instanceof Error) {
      message.error("获取题目详情失败：" + e.message);
    } else {
      message.error("获取题目详情失败.");
    }
  }

  // 错误处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试！</div>;
  } else if (!question) {
    return <div>获取题目详情失败，请刷新重试！</div>;
  }

  // 题目菜单列表
  const questionMenuItemList = (bank.questionPage?.records || []).map(
    (question) => {
      return {
        label:
          <Link href={`/bank/${bank.id}/question/${question.id}`} prefetch={false}>
            {question.title}
          </Link>,
        key: question.id,
      };
    },
  );

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme={"light"} style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[questionId]} />
        </Sider>
        <Content>
          <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  );
}