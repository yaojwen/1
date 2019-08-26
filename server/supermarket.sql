/*
Navicat MySQL Data Transfer

Source Server         : remote
Source Server Version : 50525
Source Host           : 172.16.7.50:3306
Source Database       : supermarket

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2019-08-02 19:24:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES ('1');
INSERT INTO `test` VALUES ('2');
INSERT INTO `test` VALUES ('3');
INSERT INTO `test` VALUES ('4');
INSERT INTO `test` VALUES ('5');
INSERT INTO `test` VALUES ('6');
INSERT INTO `test` VALUES ('7');
INSERT INTO `test` VALUES ('8');
INSERT INTO `test` VALUES ('9');
INSERT INTO `test` VALUES ('10');
INSERT INTO `test` VALUES ('11');
INSERT INTO `test` VALUES ('12');

-- ----------------------------
-- Table structure for t_commodity
-- ----------------------------
DROP TABLE IF EXISTS `t_commodity`;
CREATE TABLE `t_commodity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `barCode` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `salePrice` float(10,2) DEFAULT NULL,
  `marketPrice` float(10,2) DEFAULT NULL,
  `stockPrice` float(10,2) DEFAULT NULL,
  `stockCount` int(11) DEFAULT NULL,
  `commodityWeight` float(10,2) DEFAULT NULL,
  `commodityUnit` varchar(10) DEFAULT NULL,
  `vipDiscount` varchar(10) DEFAULT NULL,
  `promotion` varchar(10) DEFAULT NULL,
  `goodsDesc` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_commodity
-- ----------------------------
INSERT INTO `t_commodity` VALUES ('1', '饮品', '35444456', '哇哈哈', '10.00', '15.00', '2.00', '5', '1.00', '瓶', '0.7', '0', null);
INSERT INTO `t_commodity` VALUES ('2', '酒类', '65444444', '飞天茅台', '1200.00', '1500.00', '200.00', '10', '500.00', 'ml', '0.9', '1', null);
INSERT INTO `t_commodity` VALUES ('3', '酒类', '63331111', '五粮春', '300.00', '500.00', '100.00', '3', '500.00', 'ml', null, '0', null);
INSERT INTO `t_commodity` VALUES ('4', '果蔬/生鲜', '14455555', '火龙果', '20.00', '35.00', '3.00', '50', '1.00', 'kg', null, '0', null);
INSERT INTO `t_commodity` VALUES ('5', '果蔬/生鲜', '58999999', '榴莲', '35.00', '50.00', '10.00', '0', null, 'kg', null, '0', null);
INSERT INTO `t_commodity` VALUES ('6', '食品类', '17777712', '三只松鼠', '25.00', '35.00', '10.00', '100', '1.00', '袋', null, '0', null);
INSERT INTO `t_commodity` VALUES ('7', '饮品', '15888882', '摩卡咖啡', '10.00', '12.00', '5.00', '20', '1.00', '瓶', null, '0', null);
INSERT INTO `t_commodity` VALUES ('8', '饮品', '15888883', '拿铁咖啡', '10.00', '12.00', '5.00', '20', '1.00', '瓶', null, '0', null);
INSERT INTO `t_commodity` VALUES ('9', '食品类', '17777712', '四只松鼠', '25.00', '35.00', '10.00', '100', '1.00', '袋', null, '0', null);
INSERT INTO `t_commodity` VALUES ('10', '食品类', '17777713', '五只松鼠', '25.00', '35.00', '10.00', '100', '1.00', '袋', null, '0', null);
INSERT INTO `t_commodity` VALUES ('11', '食品类', '17777714', '六只松鼠', '25.00', '35.00', '10.00', '100', '1.00', '袋', null, '0', null);

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `cls` varchar(255) DEFAULT NULL,
  `userGroup` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menu
-- ----------------------------

-- ----------------------------
-- Table structure for t_type
-- ----------------------------
DROP TABLE IF EXISTS `t_type`;
CREATE TABLE `t_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_type
-- ----------------------------
INSERT INTO `t_type` VALUES ('1', '饮品');
INSERT INTO `t_type` VALUES ('2', '食品类');
INSERT INTO `t_type` VALUES ('3', '香烟');
INSERT INTO `t_type` VALUES ('4', '酒类');
INSERT INTO `t_type` VALUES ('5', '干货类');
INSERT INTO `t_type` VALUES ('6', '果蔬/生鲜');
INSERT INTO `t_type` VALUES ('7', '饮品');
INSERT INTO `t_type` VALUES ('8', '调味品');
INSERT INTO `t_type` VALUES ('9', '百货类');
INSERT INTO `t_type` VALUES ('10', '日用品');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `avatarUrl` text,
  `userGroup` int(11) DEFAULT NULL,
  `inputTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'zhangs', '123', null, '2', '2019-08-01 15:26:10');
INSERT INTO `t_user` VALUES ('2', 'lis', '123', null, '2', '2019-08-01 11:48:58');
INSERT INTO `t_user` VALUES ('3', '王麻子', '0', null, '2', '2019-07-29 18:09:47');
INSERT INTO `t_user` VALUES ('4', '赵六', '0', null, '2', '2019-07-29 18:09:47');
INSERT INTO `t_user` VALUES ('5', '田七', '0', null, '2', '2019-07-29 18:09:48');
INSERT INTO `t_user` VALUES ('6', '小强', '000', null, '2', '2019-07-30 15:44:54');
INSERT INTO `t_user` VALUES ('7', '小明', '123', null, '2', '2019-07-30 15:44:35');
INSERT INTO `t_user` VALUES ('8', 'admin', '123456', null, '1', '2019-07-30 19:31:45');
INSERT INTO `t_user` VALUES ('9', 'admin22', '123', null, '1', '2019-07-30 11:18:43');
INSERT INTO `t_user` VALUES ('10', 'admin3', '123', null, '1', '2019-08-01 14:50:09');
INSERT INTO `t_user` VALUES ('11', 'admin888', '123', null, '1', '2019-07-30 11:21:10');
INSERT INTO `t_user` VALUES ('12', 'admin33', '123', null, '1', '2019-07-30 11:23:29');
INSERT INTO `t_user` VALUES ('13', 'admin6', '123', null, '1', '2019-08-01 14:50:07');
INSERT INTO `t_user` VALUES ('15', 'admin99', '123', null, '2', '2019-07-30 11:53:16');
INSERT INTO `t_user` VALUES ('16', '小小王12', 'admin', null, '2', '2019-07-30 15:10:35');
INSERT INTO `t_user` VALUES ('17', 'asdsad', 'asdsad', null, '2', '2019-08-01 15:26:13');
