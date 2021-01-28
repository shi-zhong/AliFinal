CREATE DATABASE `final`;
-------------------------------------------------
  用户表
  name  |username |userid  |
  type  |varchar  |int     |
-------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `username` VARCHAR(16) NOT NULL,
  `user_id` INT AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-------------------------------------------------
  收藏
  name  |userid   |likes  |history  |action   |
  type  |int      |string |string   |string   |
-------------------------------------------------
CREATE TABLE IF NOT EXISTS `infos` (
  `user_id` INT NOT NULL,
  `likes`  TEXT NOT NULL,
  `history` TEXT NOT NULL,
  `action` TEXT NOT NULL,
  PRIMARY KEY (`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-------------------------------------------------
  数据列表
  name  |list_id  |title  |introduce  |content  |
  type  |int      |string |string     |string   |
-------------------------------------------------
CREATE TABLE IF NOT EXISTS `lists` (
  `list_id` INT AUTO_INCREMENT NOT NULL,
  `title`  VARCHAR(30) NOT NULL,
  `introduce` VARCHAR(200) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`list_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;