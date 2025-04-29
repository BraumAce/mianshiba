"use client";

import React, { useCallback, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { usePathname } from "next/navigation";
import AccessLayout from "@/access/AccessLayout";
import { setLoginUser } from "@/stores/loginUser";
import "./globals.css";
import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('../layouts/BasicLayout'), { ssr: false })

// 不需要通用布局的路由
const noLayoutPaths = ["/user/login", "/user/register"];

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
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 初始化全局用户状态
   */
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (
      !pathname.startsWith("/user/login") &&
      !pathname.startsWith("/user/register")
    ) {
      if (res.data) {
        // 更新全局用户状态
        dispatch(setLoginUser(res.data));
      } else { }
    }
  }, [dispatch, pathname]);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, [doInitLoginUser]);

  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // 如果是登录页面，直接返回内容
  if (noLayoutPaths.includes(pathname)) {
    return (
      <html lang="zh-CN">
        <body>
          <AntdRegistry>
            <Provider store={store}>
              <InitLayout>
                <AccessLayout>{children}</AccessLayout>
              </InitLayout>
            </Provider>
          </AntdRegistry>
        </body>
      </html>
    );
  }

  // 其他页面使用通用布局
  return (
    <html lang="zh-CN">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <NoSSR>
                <AccessLayout>{children}</AccessLayout>
              </NoSSR>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
