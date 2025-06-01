// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** login GET /api/oauth/callback/${param0} */
export async function loginUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingGETParams,
  options?: { [key: string]: any }
) {
  const { source: param0, ...queryParams } = params;
  return request<API.ModelAndView>(`/api/oauth/callback/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** login PUT /api/oauth/callback/${param0} */
export async function loginUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingPUTParams,
  options?: { [key: string]: any }
) {
  const { source: param0, ...queryParams } = params;
  return request<API.ModelAndView>(`/api/oauth/callback/${param0}`, {
    method: "PUT",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** login POST /api/oauth/callback/${param0} */
export async function loginUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingPOSTParams,
  options?: { [key: string]: any }
) {
  const { source: param0, ...queryParams } = params;
  return request<API.ModelAndView>(`/api/oauth/callback/${param0}`, {
    method: "POST",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** login DELETE /api/oauth/callback/${param0} */
export async function loginUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { source: param0, ...queryParams } = params;
  return request<API.ModelAndView>(`/api/oauth/callback/${param0}`, {
    method: "DELETE",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** login PATCH /api/oauth/callback/${param0} */
export async function loginUsingPatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginUsingPATCHParams,
  options?: { [key: string]: any }
) {
  const { source: param0, ...queryParams } = params;
  return request<API.ModelAndView>(`/api/oauth/callback/${param0}`, {
    method: "PATCH",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** renderAuth GET /api/oauth/render/${param0} */
export async function renderAuthUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.renderAuthUsingGETParams,
  options?: { [key: string]: any }
) {
  const { source: param0, ...queryParams } = params;
  return request<string>(`/api/oauth/render/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}
