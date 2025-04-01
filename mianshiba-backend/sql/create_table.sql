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

# 数据表初始化

-- 用户表
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
    UNIQUE KEY idx_username (username),
    INDEX idx_phone (phone),
    INDEX idx_email (email)
) COMMENT '用户表' COLLATE = utf8mb4_unicode_ci;

-- 用户三方登录关联表
CREATE TABLE IF NOT EXISTS user_third_auth
(
    id            bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id       bigint       NOT NULL COMMENT '用户ID',
    open_id       varchar(256) NOT NULL COMMENT '平台OpenID',
    platform      varchar(256) NOT NULL COMMENT '平台名称',
    type          varchar(32)  NOT NULL COMMENT '平台类型',
    identifier    varchar(256) DEFAULT NULL COMMENT '唯一标识',
    access_token  varchar(256) DEFAULT NULL COMMENT '访问令牌',
    refresh_token varchar(256) DEFAULT NULL COMMENT '刷新令牌',
    expires_in    int          DEFAULT NULL COMMENT '令牌有效期(秒)',
    PRIMARY KEY (id),
    UNIQUE KEY idx_user_platform (user_id, platform, type),
    INDEX idx_open_id (open_id),
    INDEX idx_platform (platform),
    INDEX idx_type (type)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='第三方登录关联表';

-- 题库表
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
    UNIQUE KEY uk_bank_id (bank_id),
    INDEX idx_type (type),
    INDEX idx_priority (priority),
    INDEX idx_create_operator (create_operator),
    INDEX idx_is_delete (is_delete)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='题库表';

-- 题目表
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
    UNIQUE KEY uk_question_id (question_id),
    FULLTEXT INDEX ft_title_content (title, content) COMMENT '全文索引',
    INDEX idx_priority (priority),
    INDEX idx_create_operator (create_operator),
    INDEX idx_view_num (view_num),
    INDEX idx_like_num (like_num),
    INDEX idx_favorite_num (favorite_num),
    INDEX idx_is_delete (is_delete)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='题目表';

-- 题库题目关联表
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
    INDEX idx_question_order (question_order),
    CONSTRAINT fk_bank FOREIGN KEY (bank_id) REFERENCES question_bank (bank_id) ON DELETE CASCADE,
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='题库题目关联表';

-- 帖子表
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
    INDEX idx_priority (priority),
    INDEX idx_status (status),
    INDEX idx_create_operator (create_operator),
    INDEX idx_view_num (view_num),
    INDEX idx_like_num (like_num),
    INDEX idx_favorite_num (favorite_num),
    INDEX idx_comment_num (comment_num),
    INDEX idx_is_delete (is_delete),
    INDEX idx_create_time (create_time)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='帖子表';

-- 评论表
CREATE TABLE IF NOT EXISTS comment
(
    id              bigint   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    comment_id      bigint   NOT NULL COMMENT '评论ID',
    object_id       bigint   NOT NULL COMMENT '评论对象ID',
    parent_id       bigint   NOT NULL DEFAULT 0 COMMENT '父评论ID(0表示一级评论)',
    content         text     NOT NULL COMMENT '评论内容',
    object_type     tinyint  NOT NULL DEFAULT 0 COMMENT '对象类型(0:帖子;1:题目)',
    like_num        int      NOT NULL DEFAULT 0 COMMENT '点赞量',
    create_operator bigint   NOT NULL COMMENT '创建者ID',
    create_time     datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    is_delete       tinyint  NOT NULL DEFAULT 0 COMMENT '是否删除(0:否;1:是)',
    PRIMARY KEY (id),
    UNIQUE KEY uk_comment_id (comment_id),
    INDEX idx_object (object_id, object_type) COMMENT '评论对象索引',
    INDEX idx_parent (parent_id) COMMENT '父评论索引',
    INDEX idx_create_operator (create_operator) COMMENT '创建者索引',
    INDEX idx_create_time (create_time) COMMENT '创建时间索引',
    INDEX idx_is_delete (is_delete) COMMENT '删除状态索引',
    INDEX idx_like_num (like_num) COMMENT '点赞量索引'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='评论表';

-- 收藏表
CREATE TABLE IF NOT EXISTS favorites
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
    INDEX idx_type (type) COMMENT '内容类型索引',
    INDEX idx_priority (priority) COMMENT '优先级索引',
    INDEX idx_is_delete (is_delete) COMMENT '删除状态索引',
    INDEX idx_create_time (create_time) COMMENT '创建时间索引'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='收藏表';

-- 用户关注关联表
CREATE TABLE IF NOT EXISTS user_follow
(
    id          bigint   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    follower_id bigint   NOT NULL COMMENT '关注者ID',
    followed_id bigint   NOT NULL COMMENT '被关注者ID',
    create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_follow_relation (follower_id, followed_id) COMMENT '关注关系唯一索引',
    INDEX idx_follower_id (follower_id) COMMENT '关注者索引',
    INDEX idx_followed_id (followed_id) COMMENT '被关注者索引',
    INDEX idx_create_time (create_time) COMMENT '关注时间索引',
    CONSTRAINT fk_follower FOREIGN KEY (follower_id) REFERENCES user (user_id) ON DELETE CASCADE,
    CONSTRAINT fk_followed FOREIGN KEY (followed_id) REFERENCES user (user_id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户关注关联表';

-- 用户行为记录表
CREATE TABLE IF NOT EXISTS user_behavior
(
    id              bigint       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id         bigint       NOT NULL COMMENT '用户ID',
    content_id      bigint       NOT NULL COMMENT '关联内容ID',
    behavior_type   int          NOT NULL COMMENT '行为类型(1:浏览;2:点赞;3:收藏;4:评论;5:分享等)',
    behavior_detail json                  DEFAULT NULL COMMENT '行为详情(JSON格式)',
    device_info     varchar(256) NOT NULL COMMENT '设备信息',
    device_ip       int          NOT NULL COMMENT '设备IP(存储IP的整型值)',
    create_time     datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    INDEX idx_user_id (user_id) COMMENT '用户索引',
    INDEX idx_content_id (content_id) COMMENT '内容索引',
    INDEX idx_behavior_type (behavior_type) COMMENT '行为类型索引',
    INDEX idx_create_time (create_time) COMMENT '时间索引',
    INDEX idx_user_behavior (user_id, behavior_type) COMMENT '用户行为组合索引',
    INDEX idx_content_behavior (content_id, behavior_type) COMMENT '内容行为组合索引'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户行为记录表';