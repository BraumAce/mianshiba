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
  const doInitLoginUser = useCallback( async () => {
    const res = await getLoginUserUsingGet();
    if (
      !pathname.startsWith("/user/login") &&
      !pathname.startsWith("/user/register")
    ) {
      if (res.data) {
        // 更新全局用户状态
        dispatch(setLoginUser(res.data));
      } else {}
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
  return (
    <html lang="zh">
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
