package com.yuan.mianshiba.model.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.util.Date;
import lombok.Data;

/**
 * 用户SSO关联表
 * @TableName ws_user_sso
 */
@TableName(value ="ws_user_sso")
@Data
public class UserSso {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * sso记录id
     */
    private Long ssoId;

    /**
     * token信息
     */
    private Object tokenInfo;


    /**
     * 是否删除
     */
    @TableField(fill = FieldFill.INSERT)
    @TableLogic
    private Integer isDelete;
}