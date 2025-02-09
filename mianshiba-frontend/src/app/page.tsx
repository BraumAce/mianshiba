"use server";

import Title from "antd/es/typography/Title";
import { Divider, Flex } from "antd";
import "./index.css";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {

  let questionBankList = [];

  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: 'createTime',
      sortOrder: 'descend',
    })
    questionBankList = (questionBankRes as any).data.records ?? [];
  } catch (e) {
    if (e instanceof Error) {
      console.error('获取题库列表失败.' + e.message);
    }
    console.error('获取题库列表失败.');
  }

  return <div id="homePage" className="max-width-content">
    <Flex justify="space-between" align="center">
      <Title level={3}>最新题库</Title>
      <Link href={"/banks"}>查看更多</Link>
    </Flex>
    <QuestionBankList questionBankList={questionBankList} />
    <Divider />
    <Flex justify="space-between" align="center">
      <Title level={3}>最新题目</Title>
      <Link href={"/banks"}>查看更多</Link>
    </Flex>
    <div>
      题目列表
    </div>
  </div>;
}
