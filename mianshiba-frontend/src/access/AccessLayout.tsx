import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { findAllMenuItemByPath } from "../../config/menus";
import Access_Enum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";
import React from "react";

/**
 * 统一权限校验拦截器
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({children}) => {
  const pathname = usePathname();

  // 当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);

  // 当前路径需要的权限
  const menu = findAllMenuItemByPath(pathname) || {};
  const needAccess = menu?.access || Access_Enum.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return <>{children}</>;
};

export default AccessLayout;