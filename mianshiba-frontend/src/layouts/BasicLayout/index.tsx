"use client";
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { menus } from "../../../config/menus";
import { Dropdown, Input, theme } from "antd";
import { ProLayout } from "@ant-design/pro-components";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";

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
          src: "/assets/logo.png",
          size: "small",
          title: "BraumAce",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
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
          const defaultDom = (
            <a>
              {logo}
              {title}
            </a>
          );
          if (typeof window === "undefined") return defaultDom;
          if (document.body.clientWidth < 1400) {
            return defaultDom;
          }
          if (_.isMobile) return defaultDom;
          return <>{defaultDom}</>;
        }}
        // 底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 菜单项数据
        menuDataRender={() => {
          return menus;
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
