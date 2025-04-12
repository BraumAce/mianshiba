package com.yuan.mianshiba.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuan.mianshiba.model.entity.UserSso;
import com.yuan.mianshiba.service.UserSsoService;
import com.yuan.mianshiba.mapper.UserSsoMapper;
import org.springframework.stereotype.Service;

/**
* @author liuguang
* @description 针对表【ws_user_sso(用户SSO关联表)】的数据库操作Service实现
* @createDate 2025-04-06 17:05:26
*/
@Service
public class UserSsoServiceImpl extends ServiceImpl<UserSsoMapper, UserSso>
    implements UserSsoService {

}




