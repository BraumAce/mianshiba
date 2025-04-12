package com.yuan.mianshiba.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.injector.methods.SelectById;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuan.mianshiba.config.OidcConfig;
import com.yuan.mianshiba.config.SsoConfig;
import com.yuan.mianshiba.model.entity.SsoIntegration;
import com.yuan.mianshiba.model.entity.User;
import com.yuan.mianshiba.service.SsoIntegrationService;
import com.yuan.mianshiba.mapper.SsoIntegrationMapper;
import com.yuan.mianshiba.service.UserService;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author liuguang
 * @description 针对表【ws_sso_integration(SSO集成配置表)】的数据库操作Service实现
 * @createDate 2025-04-06 17:00:14
 */
@Service
public class SsoIntegrationServiceImpl extends ServiceImpl<SsoIntegrationMapper, SsoIntegration> implements SsoIntegrationService {

    @Resource
    private SsoConfig ssoConfig;

    @Resource
    private SsoIntegrationMapper ssoIntegrationMapper;

    @Resource
    private UserService userService;

    @Override
    public String getLoginUrl() {
        String clientId = ssoConfig.getClientId();
        LambdaQueryWrapper<SsoIntegration> queryWrapper = new LambdaQueryWrapper<SsoIntegration>()
                .eq(SsoIntegration::getClientId, clientId)
                .eq(SsoIntegration::getClientName, "Authing")
                .eq(SsoIntegration::getProtocol, "OIDC")
                .eq(SsoIntegration::getIsEnabled, 1)
                .eq(SsoIntegration::getIsDelete, 0);
        SsoIntegration ssoIntegration = ssoIntegrationMapper.selectOne(queryWrapper);
        if (ssoIntegration == null) {
            return null;
        }
        String metadata = ssoIntegration.getMetadata();
        JSONObject metadataJson = JSONUtil.parseObj(metadata);
        String authorizationUri = (String) metadataJson.get("authorization_endpoint");

        Map<String, Object> params = new ConcurrentHashMap<>();
        params.put("client_id", clientId);
        params.put("redirect_uri", ssoConfig.getIssuerUri());
        params.put("scope", "openid");
        params.put("response_type", "code");
        params.put("state", IdUtil.simpleUUID());
        return authorizationUri + "?" + URLUtil.buildQuery(params, StandardCharsets.UTF_8);
    }

    /**
     * 获取授权URL
     *
     * @param state 状态参数
     * @return 授权URL
     */
    @Override
    public String getAuthorizationUrl(String state) {
        String clientId = ssoConfig.getClientId();
        LambdaQueryWrapper<SsoIntegration> queryWrapper = new LambdaQueryWrapper<SsoIntegration>()
                .eq(SsoIntegration::getClientId, clientId)
                .eq(SsoIntegration::getClientName, "Authing")
                .eq(SsoIntegration::getProtocol, "OIDC")
                .eq(SsoIntegration::getIsEnabled, 1)
                .eq(SsoIntegration::getIsDelete, 0);
        SsoIntegration ssoIntegration = ssoIntegrationMapper.selectOne(queryWrapper);
        if (ssoIntegration == null) {
            return null;
        }
        String metadata = ssoIntegration.getMetadata();
        JSONObject metadataJson = JSONUtil.parseObj(metadata);
        String authorizationUri = (String) metadataJson.get("authorization_endpoint");

        Map<String, Object> params = new ConcurrentHashMap<>();
        params.put("client_id", clientId);
        params.put("redirect_uri", "http://localhost:8101/api/sso/callback");
        params.put("scope", "openid");
        params.put("response_type", "code");
        params.put("state", state);
        return authorizationUri + "?" + URLUtil.buildQuery(params, StandardCharsets.UTF_8);
    }

    /**
     * 处理授权回调
     *
     * @param code 授权码
     * @return 用户ID
     */
    @Override
    public Long handleCallback(String code) {
        // 1. 使用授权码获取Token
        JSONObject tokenResponse = getToken(code);
        String accessToken = null;
        String idToken = null;
        if (tokenResponse != null) {
            accessToken = tokenResponse.getStr("access_token");
            idToken = tokenResponse.getStr("id_token");
        }

        // 2. 获取用户信息
        JSONObject userInfo = getUserInfo(accessToken);

        // 3. 处理用户信息
        if (userInfo != null) {
            return processUserInfo(userInfo);
        }
        return null;
    }

    /**
     * 获取登出URL
     *
     * @return 登出URL
     */
    @Override
    public String getLogoutUrl() {
        String clientId = ssoConfig.getClientId();
        LambdaQueryWrapper<SsoIntegration> queryWrapper = new LambdaQueryWrapper<SsoIntegration>()
                .eq(SsoIntegration::getClientId, clientId)
                .eq(SsoIntegration::getProtocol, "OIDC");
        SsoIntegration ssoIntegration = ssoIntegrationMapper.selectOne(queryWrapper);
        if (ssoIntegration == null) {
            return null;
        }
        JSONObject metadataJson = JSONUtil.parseObj(ssoIntegration.getMetadata());
        String logoutUrl = metadataJson.getStr("end_session_endpoint");

        Map<String, Object> params = new ConcurrentHashMap<>();
        params.put("redirect_uri", "http://localhost:3000");

        return logoutUrl + "?" + URLUtil.buildQuery(params, StandardCharsets.UTF_8);
    }

    /**
     * 获取Token
     *
     * @param code 授权码
     * @return Token响应
     */
    private JSONObject getToken(String code) {
        String clientId = ssoConfig.getClientId();
        String clientSecret = ssoConfig.getClientSecret();
        String redirectUri = ssoConfig.getRedirectUri();
        LambdaQueryWrapper<SsoIntegration> queryWrapper = new LambdaQueryWrapper<SsoIntegration>()
                .eq(SsoIntegration::getClientId, clientId)
                .eq(SsoIntegration::getProtocol, "OIDC");
        SsoIntegration ssoIntegration = ssoIntegrationMapper.selectOne(queryWrapper);
        if (ssoIntegration == null) {
            return null;
        }

        String metadata = ssoIntegration.getMetadata();
        JSONObject metadataJson = JSONUtil.parseObj(metadata);
        String tokenUri = (String) metadataJson.get("token_endpoint");
        Map<String, Object> params = new ConcurrentHashMap<>();
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("grant_type", "authorization_code");
        params.put("redirect_uri", redirectUri);
        params.put("code", code);

        try (HttpResponse response = HttpRequest.post(tokenUri)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .form(params)
                .execute()) {
            return JSONUtil.parseObj(response.body());
        }
    }

    /**
     * 获取用户信息
     *
     * @param accessToken 访问令牌
     * @return 用户信息
     */
    private JSONObject getUserInfo(String accessToken) {
        String clientId = ssoConfig.getClientId();
        LambdaQueryWrapper<SsoIntegration> queryWrapper = new LambdaQueryWrapper<SsoIntegration>()
                .eq(SsoIntegration::getClientId, clientId)
                .eq(SsoIntegration::getProtocol, "OIDC");
        SsoIntegration ssoIntegration = ssoIntegrationMapper.selectOne(queryWrapper);
        if (ssoIntegration == null) {
            return null;
        }
        JSONObject metadataJson = JSONUtil.parseObj(ssoIntegration.getMetadata());
        try (HttpResponse response = HttpRequest.get(metadataJson.getStr("userinfo_endpoint"))
                .header("Authorization", "Bearer " + accessToken)
                .execute()) {
            return JSONUtil.parseObj(response.body());
        }
    }

    /**
     * 处理用户信息
     *
     * @param userInfo 用户信息
     * @return 用户ID
     */
    private Long processUserInfo(JSONObject userInfo) {
        String sub = userInfo.getStr("sub");
        String username = userInfo.getStr("username");
        String email = userInfo.getStr("email");
        String name = userInfo.getStr("name");
        String profile = userInfo.getStr("profile");

        // 查找或创建用户
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<User>()
                .eq(User::getUserAccount, sub);
        User user = userService.getBaseMapper().selectOne(queryWrapper);
        if (user == null) {
            user = new User();
            user.setUserAccount(sub);
            user.setUserPassword("");
            user.setUserName(username);
            user.setUserRole("user");
            userService.save(user);
        }

        // 登录用户
        StpUtil.login(user.getId());
        return user.getId();
    }

}




