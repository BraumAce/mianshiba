package com.yuan.mianshiba.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 授权配置
 *
 * @author BrumAce
 */
@Configuration
@ConfigurationProperties(prefix = "auth")
@Data
public class AuthConfig {

    private QQ qq;

    private GitHub github;

    private Google google;

    @Data
    public static class QQ {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
    }

    @Data
    public static class GitHub {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
    }

    @Data
    public static class Google {
        private String clientId;
        private String clientSecret;
        private String redirectUri;
    }

    public String getClientId(String source) {
        switch (source.toLowerCase()) {
            case "qq":
                return qq.getClientId();
            case "github":
                return github.getClientId();
            case "google":
                return google.getClientId();
            default:
                throw new IllegalArgumentException("Unsupported source: " + source);
        }
    }

    public String getClientSecret(String source) {
        switch (source.toLowerCase()) {
            case "qq":
                return qq.getClientSecret();
            case "github":
                return github.getClientSecret();
            case "google":
                return google.getClientSecret();
            default:
                throw new IllegalArgumentException("Unsupported source: " + source);
        }
    }

    public String getRedirectUri(String source) {
        switch (source.toLowerCase()) {
            case "qq":
                return qq.getRedirectUri();
            case "github":
                return github.getRedirectUri();
            case "google":
                return google.getRedirectUri();
            default:
                throw new IllegalArgumentException("Unsupported source: " + source);
        }
    }
}