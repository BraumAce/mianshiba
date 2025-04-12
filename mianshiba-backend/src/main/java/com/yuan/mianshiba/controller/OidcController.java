package com.yuan.mianshiba.controller;

import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.IdUtil;
import com.yuan.mianshiba.common.BaseResponse;
import com.yuan.mianshiba.common.ResultUtils;
import com.yuan.mianshiba.service.OidcService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * OIDC控制器
 *
 * @author BraumAce
 */
@RestController
@RequestMapping("/oidc")
@RequiredArgsConstructor
@Slf4j
public class OidcController {

    private final OidcService oidcService;

    /**
     * 获取授权URL
     *
     * @return 授权URL
     */
    @GetMapping("/auth")
    public BaseResponse<String> auth() {
        String state = IdUtil.simpleUUID();
        String authUrl = oidcService.getAuthorizationUrl(state);
        return ResultUtils.success(authUrl);
    }

    /**
     * 处理授权回调
     *
     * @param code  授权码
     * @param state 状态参数
     * @return 处理结果
     */
    @GetMapping("/callback")
    public BaseResponse<Long> callback(@RequestParam String code, @RequestParam String state) {
        Long userId = oidcService.handleCallback(code, state);
        return ResultUtils.success(userId);
    }

    /**
     * 登出
     *
     * @param idToken ID令牌
     * @return 登出URL
     */
    @GetMapping("/logout")
    public BaseResponse<String> logout(@RequestParam String idToken) {
        StpUtil.logout();
        String logoutUrl = oidcService.getLogoutUrl(idToken);
        return ResultUtils.success(logoutUrl);
    }
}