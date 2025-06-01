package com.yuan.mianshiba.controller;

import com.alibaba.fastjson.JSONObject;
import com.xkcoding.http.config.HttpConfig;
import com.yuan.mianshiba.common.BaseResponse;
import com.yuan.mianshiba.common.ResultUtils;
import com.yuan.mianshiba.service.UserService;
import lombok.extern.slf4j.Slf4j;
import me.zhyd.oauth.config.AuthConfig;
import me.zhyd.oauth.enums.scope.AuthGithubScope;
import me.zhyd.oauth.enums.scope.AuthGoogleScope;
import me.zhyd.oauth.exception.AuthException;
import me.zhyd.oauth.model.AuthCallback;
import me.zhyd.oauth.model.AuthResponse;
import me.zhyd.oauth.model.AuthUser;
import me.zhyd.oauth.request.*;
import me.zhyd.oauth.utils.AuthScopeUtils;
import me.zhyd.oauth.utils.AuthStateUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.util.HashMap;
import java.util.Map;

/**
 * 三方授权登录接口
 *
 * @author liuguang
 */
@Slf4j
@RestController
@RequestMapping("/oauth")
public class RestAuthController {

    @Resource
    private com.yuan.mianshiba.config.AuthConfig authConfig;

    @Resource
    private UserService userService;

    @GetMapping("/render/{source}")
    public BaseResponse<String> renderAuth(@PathVariable("source") String source, HttpServletResponse response) throws IOException {
        log.info("进入render：{}", source);
        AuthRequest authRequest = getAuthRequest(source);
        String authorizeUrl = authRequest.authorize(AuthStateUtils.createState());
        log.info(authorizeUrl);
        return ResultUtils.success(authorizeUrl);
    }

    @RequestMapping("/callback/{source}")
    public ModelAndView login(@PathVariable("source") String source, AuthCallback callback, HttpServletRequest request) {
        log.info("进入callback：{} callback params：{}", source, JSONObject.toJSONString(callback));
        AuthRequest authRequest = getAuthRequest(source);
        AuthResponse<AuthUser> response = authRequest.login(callback);
        log.info(JSONObject.toJSONString(response));

        if (response.ok()) {
            AuthUser authUser = response.getData();
            userService.userLoginByAuth(authUser, request);
            return new ModelAndView("redirect:http://localhost:3000");
        }

        Map<String, Object> map = new HashMap<>(1);
        map.put("errorMsg", response.getMsg());

        return new ModelAndView("error", map);
    }

    /**
     * 根据具体的授权来源，获取授权请求工具类
     *
     * @param source
     * @return
     */
    private AuthRequest getAuthRequest(String source) {
        AuthRequest authRequest = null;
        switch (source.toLowerCase()) {
            case "qq":
                authRequest = new AuthQqRequest(AuthConfig.builder()
                        .clientId(authConfig.getClientId("qq"))
                        .clientSecret(authConfig.getClientSecret("qq"))
                        .redirectUri(authConfig.getRedirectUri("qq"))
                        .build());
                break;
            case "github":
                authRequest = new AuthGithubRequest(AuthConfig.builder()
                        .clientId(authConfig.getClientId("github"))
                        .clientSecret(authConfig.getClientSecret("github"))
                        .redirectUri(authConfig.getRedirectUri("github"))
                        .scopes(AuthScopeUtils.getScopes(AuthGithubScope.values()))
                        // 针对国外平台配置代理
                        .httpConfig(HttpConfig.builder()
                                .timeout(15000)
                                .proxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 7890)))
                                .build())
                        .build());
                break;
            case "google":
                authRequest = new AuthGoogleRequest(AuthConfig.builder()
                        .clientId(authConfig.getClientId("google"))
                        .clientSecret(authConfig.getClientSecret("google"))
                        .redirectUri(authConfig.getRedirectUri("google"))
                        .scopes(AuthScopeUtils.getScopes(AuthGoogleScope.USER_EMAIL, AuthGoogleScope.USER_PROFILE, AuthGoogleScope.USER_OPENID))
                        // 针对国外平台配置代理
                        .httpConfig(HttpConfig.builder()
                                .timeout(15000)
                                .proxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 7890)))
                                .build())
                        .build());
                break;
            default:
                break;
        }
        if (null == authRequest) {
            throw new AuthException("未获取到有效的Auth配置");
        }
        return authRequest;
    }
}
