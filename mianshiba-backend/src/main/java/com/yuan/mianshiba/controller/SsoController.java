package com.yuan.mianshiba.controller;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.yuan.mianshiba.common.BaseResponse;
import com.yuan.mianshiba.common.ErrorCode;
import com.yuan.mianshiba.common.ResultUtils;
import com.yuan.mianshiba.config.SsoConfig;
import com.yuan.mianshiba.exception.ThrowUtils;
import com.yuan.mianshiba.model.entity.SsoIntegration;
import com.yuan.mianshiba.service.SsoIntegrationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * SSO接口
 */
@RestController
@RequestMapping("/sso")
@Slf4j
public class SsoController {

    @Resource
    private SsoConfig ssoConfig;

    @Resource
    private SsoIntegrationService ssoIntegrationService;

    // 创建 SSO 配置
    @GetMapping("/create")
    public BaseResponse<Long> create() {
        String clientId = ssoConfig.getClientId();
        String issuerUri = ssoConfig.getIssuerUri();
        String configUri = issuerUri + "/.well-known/openid-configuration";
        String response = HttpUtil.get(configUri);
        JSONObject configJson = JSONUtil.parseObj(response);

        // 提取元数据信息
        Map<String, Object> metadataMap = new HashMap<>();
        metadataMap.put("issuer", configJson.getStr("issuer"));
        metadataMap.put("authorization_endpoint", configJson.getStr("authorization_endpoint"));
        metadataMap.put("token_endpoint", configJson.getStr("token_endpoint"));
        metadataMap.put("jwks_uri", configJson.getStr("jwks_uri"));
        metadataMap.put("end_session_endpoint", configJson.getStr("end_session_endpoint"));
        metadataMap.put("userinfo_endpoint", configJson.getStr("userinfo_endpoint"));
        metadataMap.put("grant_types_supported", configJson.getJSONArray("grant_types_supported"));
        metadataMap.put("response_types_supported", configJson.getJSONArray("response_types_supported"));
        String metadataJson = JSONUtil.toJsonStr(metadataMap);

        SsoIntegration ssoInfo = new SsoIntegration();
        ssoInfo.setProtocol("OIDC");
        ssoInfo.setClientId(clientId);
        ssoInfo.setClientName("Authing");
        ssoInfo.setGrantType("authorization_code");
        ssoInfo.setMetadata(metadataJson);
        ssoInfo.setIsEnabled(1);
        ssoInfo.setIsDelete(0);

        boolean result = ssoIntegrationService.save(ssoInfo);
        if (!result) {
            log.error("Failed to save SsoIntegration record: {}", ssoInfo);
        }
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(ssoInfo.getId());
    }

    // 更新 SSO 配置
    @PostMapping("/update")
    public String update() {
        return null;
    }

    // 删除 SSO 配置
    @PostMapping("/delete")
    public String delete() {
        return null;
    }

    // 回调接口
    @GetMapping("/callback")
    public String callback(@RequestParam String code) {
        Long userId = ssoIntegrationService.handleCallback(code);
        if (userId != null) {
            return "redirect:http://localhost:3000";
        }
        return null;
    }
}
