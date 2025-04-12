package com.yuan.mianshiba.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "sso.client.authing")
@Data
public class SsoConfig {

    private String clientId;

    private String clientSecret;

    private String redirectUri;

    private String issuerUri;
}
