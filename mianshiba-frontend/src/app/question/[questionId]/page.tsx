"use server";

import { message } from "antd";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import "./index.css";

/**
 * 题目详情页面
 * @constructor
 */
export default async function QuestionPage({ params }) {
  // 题目id
  const { questionId } = params;
  let question = undefined;

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
  if (!question) {
    return <div>获取题目详情失败，请刷新重试！</div>;
  }

  return (
    <div id="questionPage">
      <QuestionCard question={question} />
    </div>
  );
}