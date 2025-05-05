// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** login GET /api/oauth/callback */
export async function loginUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/oauth/callback", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login PUT /api/oauth/callback */
export async function loginUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingPUTParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/oauth/callback", {
    method: "PUT",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login POST /api/oauth/callback */
export async function loginUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/oauth/callback", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login DELETE /api/oauth/callback */
export async function loginUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/oauth/callback", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login PATCH /api/oauth/callback */
export async function loginUsingPatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingPATCHParams,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/oauth/callback", {
    method: "PATCH",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** renderAuth GET /api/oauth/render */
export async function renderAuthUsingGet(options?: { [key: string]: any }) {
  return request<any>("/api/oauth/render", {
    method: "GET",
    ...(options || {}),
  });
}

/** renderAuth PUT /api/oauth/render */
export async function renderAuthUsingPut(options?: { [key: string]: any }) {
  return request<any>("/api/oauth/render", {
    method: "PUT",
    ...(options || {}),
  });
}

/** renderAuth POST /api/oauth/render */
export async function renderAuthUsingPost(options?: { [key: string]: any }) {
  return request<any>("/api/oauth/render", {
    method: "POST",
    ...(options || {}),
  });
}

/** renderAuth DELETE /api/oauth/render */
export async function renderAuthUsingDelete(options?: { [key: string]: any }) {
  return request<any>("/api/oauth/render", {
    method: "DELETE",
    ...(options || {}),
  });
}

/** renderAuth PATCH /api/oauth/render */
export async function renderAuthUsingPatch(options?: { [key: string]: any }) {
  return request<any>("/api/oauth/render", {
    method: "PATCH",
    ...(options || {}),
  });
}
