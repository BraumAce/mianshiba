"use server";

import Title from "antd/es/typography/Title";
import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";
import "./index.css";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }: any) {
  // 获取 url 的查询参数
  const { q: searchText } = await searchParams;
  // 题目列表和总数
  let questionList = [];
  let total = 0;

  try {
    const res = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "_score",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e: any) {
    // 服务端组件中不能使用 antd 的 message 组件
    console.error("获取题目列表失败：", e);
  }

  // 错误处理
  if (!questionList) {
    return <div>获取题目列表失败，请刷新重试！</div>;
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}