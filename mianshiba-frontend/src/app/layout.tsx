"use client";
import React, { useCallback, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import "./globals.css";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  /**
   * 全局初始化函数
   */
  const doInit = useCallback(() => {
    console.log("hello！这里是面试吧！")
  }, []);

  // 只执行一次
  useEffect(() => {
    doInit();
  }, [doInit]);

  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <InitLayout>
            <BasicLayout>{children}</BasicLayout>
          </InitLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
