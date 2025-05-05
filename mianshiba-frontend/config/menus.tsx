import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import Access_Enum from "@/access/accessEnum";

// 菜单列表
export const menus: MenuDataItem[] = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "/mockInterview/add",
    name: "模拟面试",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: Access_Enum.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: Access_Enum.ADMIN,
      },
      {
        path: "/admin/bank",
        name: "题库管理",
        access: Access_Enum.ADMIN,
      },
      {
        path: "/admin/question",
        name: "题目管理",
        access: Access_Enum.ADMIN,
      }
    ],
  },
] as MenuDataItem[];

// 根据路径查找全部菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

// 根据路径查找菜单
export const findMenuItemByPath = (
  menus: MenuDataItem[],
  path: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedMenuItem = findMenuItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  return null;
};
