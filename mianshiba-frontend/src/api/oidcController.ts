// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** auth GET /api/oidc/auth */
export async function authUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>("/api/oidc/auth", {
    method: "GET",
    ...(options || {}),
  });
}

/** callback GET /api/oidc/callback */
export async function callbackUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.callbackUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/oidc/callback", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** logout GET /api/oidc/logout */
export async function logoutUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.logoutUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseString_>("/api/oidc/logout", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
