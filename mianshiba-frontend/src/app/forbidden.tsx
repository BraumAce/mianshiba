import { Button, Result } from "antd";
import React from "react";

/**
 * 403 页面
 * @constructor
 */
const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问此页面。"
      extra={
        <Button type="primary" href="/">
          返回首页
        </Button>
      }
    />
  );
};

export default Forbidden;