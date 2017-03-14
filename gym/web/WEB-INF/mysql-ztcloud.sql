/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50022
Source Host           : localhost:3306
Source Database       : mysql-ztcloud

Target Server Type    : MYSQL
Target Server Version : 50022
File Encoding         : 65001

Date: 2017-03-13 22:10:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime default NULL,
  `name` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime default NULL,
  `name` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for `role_resource`
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `id` int(11) NOT NULL auto_increment,
  `resource_id` int(11) default NULL,
  `role_id` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_resource
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_bulletin`
-- ----------------------------
DROP TABLE IF EXISTS `tb_bulletin`;
CREATE TABLE `tb_bulletin` (
  `bulletin_id` int(11) NOT NULL auto_increment,
  `content` varchar(255) default NULL,
  `publishTime` datetime default NULL,
  `remark` varchar(255) default NULL,
  `title` varchar(255) default NULL,
  `user_id` int(11) default NULL,
  PRIMARY KEY  (`bulletin_id`),
  KEY `FK_mkx0c7ahappw7d4k0j2xcd5a6` (`user_id`),
  CONSTRAINT `FK_mkx0c7ahappw7d4k0j2xcd5a6` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_bulletin
-- ----------------------------
INSERT INTO `tb_bulletin` VALUES ('1', '啦啦啦', '2017-03-13 14:48:53', null, '时间安排', '1');
INSERT INTO `tb_bulletin` VALUES ('2', '啦啦啦', '2017-03-13 14:49:06', null, '时间安排2', '1');
INSERT INTO `tb_bulletin` VALUES ('3', 'AAAA', '2017-03-13 16:11:12', null, 'AAA', '1');
INSERT INTO `tb_bulletin` VALUES ('8', '10.1-10.3闭馆', '2017-03-13 22:09:19', null, '体育馆国庆节开放时间', '1');
INSERT INTO `tb_bulletin` VALUES ('9', '正在维修中，亲见谅~~~', '2017-03-13 22:09:52', null, '体育馆维修', '1');

-- ----------------------------
-- Table structure for `tb_equipment`
-- ----------------------------
DROP TABLE IF EXISTS `tb_equipment`;
CREATE TABLE `tb_equipment` (
  `id` int(11) NOT NULL auto_increment,
  `description` varchar(255) default NULL,
  `equipment_Name` varchar(255) default NULL,
  `price` int(11) default NULL,
  `remark` varchar(255) default NULL,
  `repaire_num` int(11) default NULL,
  `total_num` int(11) default NULL,
  `used_num` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_equipment
-- ----------------------------
INSERT INTO `tb_equipment` VALUES ('1', '羽毛球拍', '羽毛球拍', '40', null, '0', '40', '0');
INSERT INTO `tb_equipment` VALUES ('2', '李宁品牌', '网球拍', '12', null, '22', '100', '12');
INSERT INTO `tb_equipment` VALUES ('3', '5元1小时', '篮球', '5', null, '0', '100', '0');

-- ----------------------------
-- Table structure for `tb_order`
-- ----------------------------
DROP TABLE IF EXISTS `tb_order`;
CREATE TABLE `tb_order` (
  `id` int(11) NOT NULL auto_increment,
  `end_time` datetime default NULL,
  `order_time` datetime default NULL,
  `remark` varchar(255) default NULL,
  `start_time` datetime default NULL,
  `playground_id` int(11) default NULL,
  `user_id` int(11) default NULL,
  PRIMARY KEY  (`id`),
  KEY `FK_79wep8a49n3dvlcr3vf05nstf` (`playground_id`),
  KEY `FK_ae3sq911hi16ynmk25squ2c66` (`user_id`),
  CONSTRAINT `FK_79wep8a49n3dvlcr3vf05nstf` FOREIGN KEY (`playground_id`) REFERENCES `tb_playground` (`playground_id`),
  CONSTRAINT `FK_ae3sq911hi16ynmk25squ2c66` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_order
-- ----------------------------
INSERT INTO `tb_order` VALUES ('1', '2017-03-11 15:52:10', '2017-03-13 14:11:36', null, '2017-03-11 15:52:10', '1', '1');
INSERT INTO `tb_order` VALUES ('2', '2017-03-11 15:52:10', '2017-03-13 14:14:49', null, '2017-03-11 15:52:10', '2', '2');
INSERT INTO `tb_order` VALUES ('3', '2017-03-13 12:30:00', '2017-03-13 21:56:31', null, '2017-03-12 12:30:00', '3', '4');
INSERT INTO `tb_order` VALUES ('4', '2017-03-13 20:00:00', '2017-03-13 22:04:35', null, '2017-03-13 08:00:00', '2', '5');

-- ----------------------------
-- Table structure for `tb_playground`
-- ----------------------------
DROP TABLE IF EXISTS `tb_playground`;
CREATE TABLE `tb_playground` (
  `playground_id` int(11) NOT NULL auto_increment,
  `description` varchar(255) default NULL,
  `is_free` varchar(255) default NULL,
  `playground_name` varchar(255) default NULL,
  `position` varchar(255) default NULL,
  `price` int(11) default NULL,
  `remark` varchar(255) default NULL,
  `size` varchar(255) default NULL,
  PRIMARY KEY  (`playground_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_playground
-- ----------------------------
INSERT INTO `tb_playground` VALUES ('1', '羽毛球场', '是', '羽毛球2号场', '1楼', '20', null, '5m*10m');
INSERT INTO `tb_playground` VALUES ('2', '篮球场', '是', '篮球2号场', '1楼', '20', null, '5m*10m');
INSERT INTO `tb_playground` VALUES ('3', '羽毛球场地', '是', '羽毛球1号场', '东1楼', '15', null, '10m*14m');

-- ----------------------------
-- Table structure for `tb_user`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime default NULL,
  `email` varchar(255) default NULL,
  `is_delete` bit(1) default NULL,
  `password` varchar(255) default NULL,
  `role` varchar(255) default NULL,
  `tel` varchar(255) default NULL,
  `username` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('1', '2017-03-13 14:10:01', '1', '', '21232f297a57a5a743894a0e4a801fc3', 'admin', '1', 'admin');
INSERT INTO `tb_user` VALUES ('2', '2017-03-13 14:10:21', '1', '', 'ee11cbb19052e40b07aac0ca060c23ee', 'vip', '1', 'user');
INSERT INTO `tb_user` VALUES ('3', '2017-03-13 14:51:45', '1', '', '63a9f0ea7bb98050796b649e85481845', 'vip', '1', 'root');
INSERT INTO `tb_user` VALUES ('4', '2017-03-13 21:55:31', '1', '', '9dfd70fdf15a3cb1ea00d7799ac6651b', 'vip', '1', 'bee');
INSERT INTO `tb_user` VALUES ('5', '2017-03-13 22:03:46', 'qing@qq.com', '', '834af260d56e6b7b01199548065ac7da', 'vip', '12121', 'qing');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  `email` varchar(30) NOT NULL,
  `tel` varchar(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('8', 'root', '63a9f0ea7bb98050796b649e85481845', '2017-02-25 16:26:21', '0', '22', '1090909881');
INSERT INTO `user` VALUES ('15', 'test', '098f6bcd4621d373cade4e832627b4f6', '2017-03-01 10:54:32', '0', 'test', 'test');
INSERT INTO `user` VALUES ('17', '1', '698d51a19d8a121ce581499d7b701668', '2017-03-01 14:12:34', '0', '1111', '1111');

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL auto_increment,
  `role_id` int(11) default NULL,
  `user_id` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
