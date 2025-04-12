package com.yuan.mianshiba.model.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.util.Date;
import lombok.Data;

/**
 * SSO集成配置表
 * @TableName ws_sso_integration
 */
@TableName(value ="ws_sso_integration")
@Data
public class SsoIntegration {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 协议类型
     */
    private String protocol;

    /**
     * 客户端id
     */
    private String clientId;

    /**
     * 客户端名称
     */
    private String clientName;

    /**
     * 授权模式
     */
    private String grantType;

    /**
     * 协议配置（端点信息）
     */
    private String metadata;

    /**
     * 是否启用
     */
    private Integer isEnabled;

    /**
     * 集成描述
     */
    private String description;

    /**
     * 是否删除
     */
    @TableField(fill = FieldFill.INSERT)
    @TableLogic
    private Integer isDelete;
}