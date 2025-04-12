// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** callback GET /api/sso/callback */
export async function callbackUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.callbackUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<string>("/api/sso/callback", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** create GET /api/sso/create */
export async function createUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>("/api/sso/create", {
    method: "GET",
    ...(options || {}),
  });
}

/** delete POST /api/sso/delete */
export async function deleteUsingPost(options?: { [key: string]: any }) {
  return request<string>("/api/sso/delete", {
    method: "POST",
    ...(options || {}),
  });
}

/** update POST /api/sso/update */
export async function updateUsingPost(options?: { [key: string]: any }) {
  return request<string>("/api/sso/update", {
    method: "POST",
    ...(options || {}),
  });
}
