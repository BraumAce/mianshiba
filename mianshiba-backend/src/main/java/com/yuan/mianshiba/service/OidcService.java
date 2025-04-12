package com.yuan.mianshiba.service;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.yuan.mianshiba.config.OidcConfig;
import com.yuan.mianshiba.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * OIDC服务类
 *
 * @author BraumAce
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OidcService {

    @Resource
    private final OidcConfig oidcConfig;

    @Resource
    private final UserService userService;


    public String getLoginUrl() {
        Map<String, Object> params = new ConcurrentHashMap<>();
        params.put("app_id", oidcConfig.getClientId());
        params.put("protocol", "oidc");
        return oidcConfig.getLoginUri() + "?" + URLUtil.buildQuery(params, null);
    }

    /**
     * 获取授权URL
     *
     * @param state 状态参数
     * @return 授权URL
     */
    public String getAuthorizationUrl(String state) {
        Map<String, Object> params = new HashMap<>(8);
        params.put("client_id", oidcConfig.getClientId());
        params.put("response_type", oidcConfig.getResponseType());
        params.put("scope", oidcConfig.getScope());
        params.put("redirect_uri", oidcConfig.getRedirectUri());
        params.put("state", state);

        return oidcConfig.getAuthorizationUri() + "?" + URLUtil.buildQuery(params, null);
    }

    /**
     * 处理授权回调
     *
     * @param code  授权码
     * @param state 状态参数
     * @return 用户ID
     */
    public Long handleCallback(String code, String state) {
        // 1. 使用授权码获取Token
        JSONObject tokenResponse = getToken(code);
        String accessToken = tokenResponse.getStr("access_token");
        String idToken = tokenResponse.getStr("id_token");

        // 2. 获取用户信息
        JSONObject userInfo = getUserInfo(accessToken);

        // 3. 处理用户信息
        return processUserInfo(userInfo);
    }

    /**
     * 获取Token
     *
     * @param code 授权码
     * @return Token响应
     */
    private JSONObject getToken(String code) {
        Map<String, Object> params = new HashMap<>(8);
        params.put("grant_type", "authorization_code");
        params.put("code", code);
        params.put("redirect_uri", oidcConfig.getRedirectUri());
        params.put("client_id", oidcConfig.getClientId());
        params.put("client_secret", oidcConfig.getClientSecret());

        HttpResponse response = HttpRequest.post(oidcConfig.getTokenUri())
                .form(params)
                .execute();

        return JSONUtil.parseObj(response.body());
    }

    /**
     * 获取用户信息
     *
     * @param accessToken 访问令牌
     * @return 用户信息
     */
    private JSONObject getUserInfo(String accessToken) {
        HttpResponse response = HttpRequest.get(oidcConfig.getUserInfoUri())
                .header("Authorization", "Bearer " + accessToken)
                .execute();

        return JSONUtil.parseObj(response.body());
    }

    /**
     * 处理用户信息
     *
     * @param userInfo 用户信息
     * @return 用户ID
     */
    private Long processUserInfo(JSONObject userInfo) {
        String sub = userInfo.getStr("sub");
        String email = userInfo.getStr("email");
        String name = userInfo.getStr("name");

        // 查找或创建用户
        User user = userService.getUserByOidcSub(sub);
        if (user == null) {
            user = new User();
            user.setUserAccount(email);
            user.setUserName(name);
            user.setUserRole("user");
            user.setUserPassword(""); // OIDC用户不需要密码
            userService.save(user);
        }

        // 登录用户
        StpUtil.login(user.getId());
        return user.getId();
    }

    /**
     * 获取登出URL
     *
     * @param idToken ID令牌
     * @return 登出URL
     */
    public String getLogoutUrl(String idToken) {
        Map<String, Object> params = new HashMap<>(4);
        params.put("id_token_hint", idToken);
        params.put("post_logout_redirect_uri", oidcConfig.getRedirectUri());

        return oidcConfig.getEndSessionUri() + "?" + URLUtil.buildQuery(params, null);
    }
}