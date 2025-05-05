# 数据库初始化

-- 创建库
create database if not exists mianshiba;

-- 切换库
use mianshiba;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment '账号',
    userPassword varchar(512)                           not null comment '密码',
    unionId      varchar(256)                           null comment '微信开放平台id',
    mpOpenId     varchar(256)                           null comment '公众号openId',
    userName     varchar(256)                           null comment '用户昵称',
    userAvatar   varchar(1024)                          null comment '用户头像',
    userProfile  varchar(512)                           null comment '用户简介',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user/admin/ban',
    editTime     datetime     default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_unionId (unionId)
) comment '用户' collate = utf8mb4_unicode_ci;

-- 题库表
create table if not exists question_bank
(
    id          bigint auto_increment comment 'id' primary key,
    title       varchar(256)                       null comment '标题',
    description text                               null comment '描述',
    picture     varchar(2048)                      null comment '图片',
    userId      bigint                             not null comment '创建用户 id',
    editTime    datetime default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime  datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete    tinyint  default 0                 not null comment '是否删除',
    index idx_title (title)
) comment '题库' collate = utf8mb4_unicode_ci;

-- 题目表
create table if not exists question
(
    id         bigint auto_increment comment 'id' primary key,
    title      varchar(256)                       null comment '标题',
    content    text                               null comment '内容',
    tags       varchar(1024)                      null comment '标签列表（json 数组）',
    answer     text                               null comment '推荐答案',
    userId     bigint                             not null comment '创建用户 id',
    editTime   datetime default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete   tinyint  default 0                 not null comment '是否删除',
    index idx_title (title),
    index idx_userId (userId)
) comment '题目' collate = utf8mb4_unicode_ci;

-- 题库题目表（硬删除）
create table if not exists question_bank_question
(
    id             bigint auto_increment comment 'id' primary key,
    questionBankId bigint                             not null comment '题库 id',
    questionId     bigint                             not null comment '题目 id',
    userId         bigint                             not null comment '创建用户 id',
    createTime     datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime     datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    UNIQUE (questionBankId, questionId)
) comment '题库题目' collate = utf8mb4_unicode_ci;

-- 功能扩展：用户个人主页资料修改
ALTER TABLE user
    ADD phoneNumber VARCHAR(20) COMMENT '手机号',
    ADD email VARCHAR(256) COMMENT '邮箱',
    ADD grade VARCHAR(50) COMMENT '年级',
    ADD workExperience VARCHAR(512) COMMENT '工作经验',
    ADD expertiseDirection VARCHAR(512) COMMENT '擅长方向';

-- 功能扩展：AI 模拟面试功能
-- 模拟面试表
create table if not exists mock_interview
(
    id             bigint auto_increment comment 'id' primary key,
    workExperience varchar(256)                       not null comment '工作年限',
    jobPosition    varchar(256)                       not null comment '工作岗位',
    difficulty     varchar(50)                        not null comment '面试难度',
    messages       mediumtext                         null comment '消息列表（JSON 对象数组字段，同时包括了总结）',
    status         int      default 0                 not null comment '状态（0-待开始、1-进行中、2-已结束）',
    userId         bigint                             not null comment '创建人（用户 id）',
    createTime     datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime     datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete       tinyint  default 0                 not null comment '是否删除（逻辑删除）',
    index idx_userId (userId)
) comment '模拟面试' collate = utf8mb4_unicode_ci;

# 数据表初始化-----------------------------------------------------------------------------------------------------------

-- 创建库
CREATE DATABASE IF NOT EXISTS mianshiba_dev;

-- 切换库
USE mianshiba_dev;

-- 用户信息表
DROP TABLE IF EXISTS user_info;
CREATE TABLE IF NOT EXISTS user_info
(
    id          bigint AUTO_INCREMENT COMMENT '主键ID' PRIMARY KEY,
    user_id     bigint                             NOT NULL COMMENT '用户ID',
    username    varchar(256)                       NOT NULL COMMENT '用户名',
    password    varchar(256)                       NOT NULL COMMENT '密码(加密存储)',
    phone       varchar(32)                        NULL COMMENT '手机号',
    email       varchar(32)                        NULL COMMENT '邮箱',
    nickname    varchar(256)                       NULL COMMENT '昵称',
    avatar      varchar(1024)                      NULL COMMENT '头像',
    profile     varchar(512)                       NULL COMMENT '用户简介',
    status      tinyint  DEFAULT 0                 NOT NULL COMMENT '账号状态(0:正常;1:冻结;2:注销)',
    is_admin    tinyint  DEFAULT 0                 NOT NULL COMMENT '是否为管理员(0:否;1:是)',
    create_time datetime DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete   tinyint  DEFAULT 0                 NOT NULL COMMENT '是否删除(0:否;1:是)',
    UNIQUE KEY idx_user_id (user_id),
    UNIQUE KEY idx_username (username)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户信息表';

-- 用户三方关联表
DROP TABLE IF EXISTS user_third_mapping;
CREATE TABLE IF NOT EXISTS user_third_mapping
(
    id            bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id       bigint       NOT NULL COMMENT '用户ID',
    open_id       varchar(256) NOT NULL COMMENT '平台OpenID',
    platform_name varchar(256) NOT NULL COMMENT '平台名称',
    platform_type varchar(32)  NOT NULL COMMENT '平台类型',
    identifier    varchar(256) DEFAULT NULL COMMENT '唯一标识',
    access_token  varchar(256) DEFAULT NULL COMMENT '访问令牌',
    refresh_token varchar(256) DEFAULT NULL COMMENT '刷新令牌',
    expires_in    int          DEFAULT NULL COMMENT '令牌有效期(秒)',
    PRIMARY KEY (id),
    UNIQUE KEY idx_user_platform (user_id, platform_name, platform_type),
    INDEX idx_open_id (open_id),
    INDEX idx_platform (platform_name),
    CONSTRAINT fk_user_third FOREIGN KEY (user_id) REFERENCES user_info (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='第三方登录关联表';

-- 题库表
DROP TABLE IF EXISTS question_bank;
CREATE TABLE IF NOT EXISTS question_bank
(
    id              bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    bank_id         bigint       NOT NULL COMMENT '题库ID',
    title           varchar(256) NOT NULL COMMENT '题库标题',
    description     text                  DEFAULT NULL COMMENT '题库描述',
    picture         varchar(2048)         DEFAULT NULL COMMENT '图片URL',
    type            tinyint      NOT NULL DEFAULT 0 COMMENT '类型(0:系统;1:个人)',
    priority        int          NOT NULL DEFAULT 0 COMMENT '优先级',
    view_num        int          NOT NULL DEFAULT 0 COMMENT '浏览量',
    create_operator bigint       NOT NULL COMMENT '创建者ID',
    create_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete       tinyint      NOT NULL DEFAULT 0 COMMENT '是否删除(0:否;1:是)',
    PRIMARY KEY (id),
    UNIQUE KEY uk_bank_id (bank_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='题库表';

-- 题目表
DROP TABLE IF EXISTS question;
CREATE TABLE IF NOT EXISTS question
(
    id              bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    question_id     bigint       NOT NULL COMMENT '题目ID',
    title           varchar(256) NOT NULL COMMENT '题目标题',
    content         text                  DEFAULT NULL COMMENT '题目内容',
    tags            varchar(1024)         DEFAULT NULL COMMENT '标签列表(JSON格式)',
    answer          text                  DEFAULT NULL COMMENT '答案',
    priority        int          NOT NULL DEFAULT 0 COMMENT '优先级',
    source          varchar(512)          DEFAULT NULL COMMENT '题目来源',
    view_num        int          NOT NULL DEFAULT 0 COMMENT '浏览量',
    like_num        int          NOT NULL DEFAULT 0 COMMENT '点赞数',
    favorite_num    int          NOT NULL DEFAULT 0 COMMENT '收藏数',
    create_operator bigint       NOT NULL COMMENT '创建者ID',
    create_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete       tinyint      NOT NULL DEFAULT 0 COMMENT '是否删除(0:否;1:是)',
    PRIMARY KEY (id),
    UNIQUE KEY uk_question_id (question_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='题目表';

-- 题库题目关联表
DROP TABLE IF EXISTS question_bank_mapping;
CREATE TABLE IF NOT EXISTS question_bank_mapping
(
    id              bigint   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    bank_id         bigint   NOT NULL COMMENT '题库ID',
    question_id     bigint   NOT NULL COMMENT '题目ID',
    question_order  int               DEFAULT 0 COMMENT '题目顺序',
    create_operator bigint   NOT NULL COMMENT '创建者ID',
    create_time     datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_bank_question (bank_id, question_id) COMMENT '题库和题目唯一索引',
    INDEX idx_bank_id (bank_id),
    INDEX idx_question_id (question_id),
    CONSTRAINT fk_bank FOREIGN KEY (bank_id) REFERENCES question_bank (bank_id) ON DELETE CASCADE,
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='题库题目关联表';

-- 帖子表
DROP TABLE IF EXISTS post;
CREATE TABLE IF NOT EXISTS post
(
    id              bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    post_id         bigint       NOT NULL COMMENT '帖子ID',
    title           varchar(256) NOT NULL COMMENT '帖子标题',
    content         text         NOT NULL COMMENT '帖子内容',
    priority        int          NOT NULL DEFAULT 0 COMMENT '优先级',
    view_num        int          NOT NULL DEFAULT 0 COMMENT '浏览量',
    like_num        int          NOT NULL DEFAULT 0 COMMENT '点赞数',
    favorite_num    int          NOT NULL DEFAULT 0 COMMENT '收藏数',
    comment_num     int          NOT NULL DEFAULT 0 COMMENT '评论数',
    status          tinyint      NOT NULL DEFAULT 0 COMMENT '状态（0：正常；1：异常）',
    create_operator bigint       NOT NULL COMMENT '创建者ID',
    create_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete       tinyint      NOT NULL DEFAULT 0 COMMENT '是否删除（0：否；1：是）',
    PRIMARY KEY (id),
    UNIQUE KEY uk_post_id (post_id),
    FULLTEXT INDEX ft_title_content (title, content) COMMENT '全文索引',
    CONSTRAINT fk_user_post FOREIGN KEY (create_operator) REFERENCES user_info (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='帖子表';

-- 用户点赞表
DROP TABLE IF EXISTS user_like;
CREATE TABLE IF NOT EXISTS user_like
(
    id           bigint   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    like_id      bigint   NOT NULL COMMENT '点赞ID',
    user_id      bigint   NOT NULL COMMENT '用户ID',
    content_id   bigint   NOT NULL COMMENT '内容ID',
    content_type tinyint  NOT NULL COMMENT '内容类型(1:帖子;2:题目;3:评论等)',
    like_status  tinyint  NOT NULL DEFAULT 1 COMMENT '点赞状态(1:已点赞;0:已取消)',
    create_time  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_like_id (like_id) COMMENT '点赞ID唯一索引',
    UNIQUE KEY uk_user_content (user_id, content_id, content_type) COMMENT '用户内容唯一索引',
    INDEX idx_content (content_id, content_type) COMMENT '内容索引',
    INDEX idx_user (user_id) COMMENT '用户索引',
    CONSTRAINT fk_user_like FOREIGN KEY (user_id) REFERENCES user_info (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户点赞表';

-- 用户评论表
DROP TABLE IF EXISTS user_comment;
CREATE TABLE IF NOT EXISTS user_comment
(
    id          bigint   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    comment_id  bigint   NOT NULL COMMENT '评论ID',
    user_id     bigint   NOT NULL COMMENT '用户ID',
    object_id   bigint   NOT NULL COMMENT '评论对象ID',
    parent_id   bigint   NOT NULL DEFAULT 0 COMMENT '父评论ID(0表示一级评论)',
    content     text     NOT NULL COMMENT '评论内容',
    object_type tinyint  NOT NULL DEFAULT 0 COMMENT '对象类型(0:帖子;1:题目)',
    like_num    int      NOT NULL DEFAULT 0 COMMENT '点赞量',
    create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    is_delete   tinyint  NOT NULL DEFAULT 0 COMMENT '是否删除(0:否;1:是)',
    PRIMARY KEY (id),
    UNIQUE KEY uk_comment_id (comment_id),
    INDEX idx_user_id (user_id) COMMENT '用户索引',
    INDEX idx_object (object_id, object_type) COMMENT '评论对象索引',
    CONSTRAINT fk_user_comment FOREIGN KEY (user_id) REFERENCES user_info (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户评论表';

-- 用户收藏表
DROP TABLE IF EXISTS user_favorites;
CREATE TABLE IF NOT EXISTS user_favorites
(
    id              bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id         bigint       NOT NULL COMMENT '用户ID',
    favorites_id    bigint       NOT NULL COMMENT '收藏夹ID',
    favorites_title varchar(256) NOT NULL COMMENT '收藏夹标题',
    favorite_id     text         NOT NULL COMMENT '收藏内容ID(可存储单个ID或JSON数组)',
    type            tinyint      NOT NULL DEFAULT 0 COMMENT '类型(0:帖子;1:题目)',
    priority        int          NOT NULL DEFAULT 0 COMMENT '优先级',
    create_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete       tinyint      NOT NULL DEFAULT 0 COMMENT '是否删除(0:否;1:是)',
    PRIMARY KEY (id),
    UNIQUE KEY uk_favorites_id (favorites_id) COMMENT '收藏夹唯一标识',
    INDEX idx_user_id (user_id) COMMENT '用户索引',
    CONSTRAINT fk_user_favorites FOREIGN KEY (user_id) REFERENCES user_info (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户收藏表';

-- 用户关注关联表
DROP TABLE IF EXISTS user_follow_mapping;
CREATE TABLE IF NOT EXISTS user_follow_mapping
(
    id          bigint   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    follower_id bigint   NOT NULL COMMENT '关注者ID',
    followed_id bigint   NOT NULL COMMENT '被关注者ID',
    create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_follow_relation (follower_id, followed_id) COMMENT '关注关系唯一索引',
    INDEX idx_follower_id (follower_id) COMMENT '关注者索引',
    INDEX idx_followed_id (followed_id) COMMENT '被关注者索引',
    CONSTRAINT fk_follower FOREIGN KEY (follower_id) REFERENCES user_info (user_id) ON DELETE CASCADE,
    CONSTRAINT fk_followed FOREIGN KEY (followed_id) REFERENCES user_info (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户关注关联表';

-- 用户行为记录表
DROP TABLE IF EXISTS user_behavior_log;
CREATE TABLE IF NOT EXISTS user_behavior_log
(
    id              bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id         bigint       NOT NULL COMMENT '用户ID',
    content_id      bigint       NOT NULL COMMENT '关联内容ID',
    behavior_type   int          NOT NULL COMMENT '行为类型(1:浏览;2:刷题;3:面试等)',
    behavior_detail json                  DEFAULT NULL COMMENT '行为详情(JSON格式)',
    device_info     varchar(256) NOT NULL COMMENT '设备信息',
    device_ip       int          NOT NULL COMMENT '设备IP(存储IP的整型值)',
    create_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    INDEX idx_user_id (user_id) COMMENT '用户索引',
    CONSTRAINT fk_user_behavior_log FOREIGN KEY (user_id) REFERENCES user_info (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户行为记录表';