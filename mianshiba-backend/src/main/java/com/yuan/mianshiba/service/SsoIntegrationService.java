package com.yuan.mianshiba.service;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.yuan.mianshiba.config.OidcConfig;
import com.yuan.mianshiba.model.entity.SsoIntegration;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yuan.mianshiba.model.entity.User;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
* @author liuguang
* @description 针对表【ws_sso_integration(SSO集成配置表)】的数据库操作Service
* @createDate 2025-04-06 17:00:14
*/
public interface SsoIntegrationService extends IService<SsoIntegration> {

    String getLoginUrl();

    String getAuthorizationUrl(String state);

    Long handleCallback(String code);

    String getLogoutUrl();
}
