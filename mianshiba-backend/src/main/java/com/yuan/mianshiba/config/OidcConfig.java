package com.yuan.mianshiba.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * OIDC配置类
 *
 * @author BraumAce
 */
@Configuration
@ConfigurationProperties(prefix = "oidc")
@Data
public class OidcConfig {
    /**
     * 客户端ID
     */
    @Value("67d8cb34639d57a09cd53c17")
    private String clientId;

    /**
     * 客户端密钥
     */
    @Value("3ccdbadaf7119b240714235ac47c7273")
    private String clientSecret;

    /**
     * 登录地址
     */
    @Value("https://sso.iam.lululemon.cn/67d8cb34639d57a09cd53c17/login")
    private String loginUri;

    /**
     * Issuer
     */
    @Value("https://sso.iam.lululemon.cn/67d8cb34639d57a09cd53c17/oidc")
    private String issuerUri;

    /**
     * Token端点
     */
    @Value("https://sso.iam.lululemon.cn/67d8cb34639d57a09cd53c17/oidc/token")
    private String tokenUri;

    /**
     * 授权端点
     */
    @Value("https://sso.iam.lululemon.cn/67d8cb34639d57a09cd53c17/oidc/auth")
    private String authorizationUri;

    /**
     * 用户信息端点
     */
    @Value("https://sso.iam.lululemon.cn/67d8cb34639d57a09cd53c17/oidc/me")
    private String userInfoUri;

    /**
     * JWKS端点
     */
    @Value("https://sso.iam.lululemon.cn/67d8cb34639d57a09cd53c17/oidc/.well-known/jwks.json")
    private String jwksUri;

    /**
     * 登出端点
     */
    @Value("https://sso.iam.lululemon.cn/67d8cb34639d57a09cd53c17/oidc/session/end")
    private String endSessionUri;

    /**
     * 回调地址
     */
    @Value("http://localhost:3000")
    private String redirectUri;

    /**
     * 作用域
     */
    private String scope = "openid profile email";

    /**
     * 响应类型
     */
    private String responseType = "code";
}