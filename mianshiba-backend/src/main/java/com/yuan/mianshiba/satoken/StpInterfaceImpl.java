package com.yuan.mianshiba.satoken;

import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import com.yuan.mianshiba.model.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import static com.yuan.mianshiba.constant.UserConstant.USER_LOGIN_STATE;

/**
 * Sa-Token 权限认证接口实现类
 *
 * @author BraumAce
 */
@Component
public class StpInterfaceImpl implements StpInterface {

    /**
     * 返回一个账户所拥有的权限码集合（目前未使用）
     */
    @Override
    public List<String> getPermissionList(Object o, String s) {
        return new ArrayList<>();
    }

    /**
     * 返回一个账户所拥有的角色标识集合（角色与权限可分开校验）
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        // 从当前登录用户信息中获取角色
        User user = (User) StpUtil.getSessionByLoginId(loginId).get(USER_LOGIN_STATE);
        if (Objects.isNull(user)) {
            return Collections.emptyList();
        }
        return Collections.singletonList(user.getUserRole());
    }
}
