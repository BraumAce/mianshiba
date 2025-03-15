"use client";

import {
  GithubFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { menus } from "../../../config/menus";
import { Dropdown, message } from "antd";
import { ProLayout } from "@ant-design/pro-components";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import getAccessibleMenus from "@/access/menuAccess";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";

interface Props {
  children: React.ReactNode;
}

/**
 * 通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // 当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);

  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e: any) {
      message.error("操作失败：" + e.message);
    }
  };

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title={"面试吧刷题平台"}
        layout={"top"}
        logo={
          <Image
            src={"/assets/logo.png"}
            height={32}
            width={32}
            alt={"面试吧刷题平台 - BraumAce"}
          />
        }
        location={{
          pathname,
        }}
        // 头像区
        avatarProps={{
          src: loginUser?.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser?.userName || "面试吧",
          render: (props, dom) => {
            return loginUser?.id ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "个人中心",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      userLogout();
                    } else if (key == "userCenter") {
                      router.push("/user/center");
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            ) : (
              <div onClick={() => router.push("/user/login")}>{dom}</div>
            );
          },
        }}
        // 操作渲染
        actionsRender={() => {
          return [
            <SearchInput key="search" />,
            <a
              key={"github"}
              href={"https://github.com/BraumAce/mianshiba"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              <GithubFilled />
            </a>,
          ];
        }}
        // 标题区
        headerTitleRender={(logo, title, _) => {
          return (
            <a href="/">
              {logo}
              {title}
            </a>
          );
        }}
        // 底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 菜单项数据
        menuDataRender={React.useCallback(() => getAccessibleMenus(loginUser, menus), [loginUser])}
        // 菜单渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
