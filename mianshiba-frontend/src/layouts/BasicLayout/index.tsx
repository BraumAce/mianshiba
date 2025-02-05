"use client";
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { menus } from "../../../config/menus";
import { Dropdown, Input, message, theme } from "antd";
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
import { router } from "next/client";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/constants/user";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索"
        variant="borderless"
      />
    </div>
  );
};

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
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
    return;
  }

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
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "面试吧",
          render: (props, dom) => {
            return loginUser.id ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick:(event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      userLogout();
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
            <SearchInput key={"search"} />,
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <a
              key={"github"}
              href={"https://github.com/BraumAce/mianshiba"}
              target={"_blank"}
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        // 标题区
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
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
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
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
