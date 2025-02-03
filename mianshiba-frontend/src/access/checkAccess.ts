import Access_Enum from "@/access/accessEnum";

/**
 * 权限校验
 * @param loginUser  当前登录用户
 * @param needAccess 需要的权限
 * @return boolean   是否有权限
 */
const checkAccess = (loginUser: API.LoginUserVO, needAccess = Access_Enum.NOT_LOGIN) => {
  // 获取当前登录用户具有的权限
  const loginUserAccess = loginUser?.userRole ?? Access_Enum.NOT_LOGIN;
  if (needAccess === Access_Enum.NOT_LOGIN) {
    return true;
  }

  // 需要用户登录才能访问
  if (needAccess === Access_Enum.USER) {
    // 用户未登录，则无权限
    if (loginUserAccess === Access_Enum.NOT_LOGIN) {
      return false;
    }
  }

  // 需要管理员权限
  if (needAccess === Access_Enum.ADMIN) {
    // 用户不是管理员，则无权限
    if (loginUserAccess !== Access_Enum.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkAccess;