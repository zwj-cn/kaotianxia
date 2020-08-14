/*
Navicat MySQL Data Transfer

Source Server         : my数据库
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2020-02-14 23:25:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pinglun
-- ----------------------------
DROP TABLE IF EXISTS `pinglun`;
CREATE TABLE `pinglun` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `xingnum` int(100) DEFAULT NULL,
  `ping` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `text` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `time` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `tou` varchar(100) CHARACTER SET utf8 DEFAULT 'moren.jpg',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pinglun
-- ----------------------------
INSERT INTO `pinglun` VALUES ('18', '机灵鬼', '4', '好评', '这是第一条评论，评论可以记录，头像、姓名、时间、星星个数、好评差评中评、以及评论内容。', '2020-2-14', 'tou.jpg');
INSERT INTO `pinglun` VALUES ('19', '青稞', '4', '好评', '这是青稞的评论', '2020-2-14', 'moren.jpg');
INSERT INTO `pinglun` VALUES ('20', '小刚', '3', '好评', '这是小刚cat的评论', '2020-2-14', 'cat.jpg');
INSERT INTO `pinglun` VALUES ('21', '小红', '0', '差评', '猪叫：呵呵呵呵呵呵呵呵呵呵呵呵', '2020-2-14', 'hong.jpg');
INSERT INTO `pinglun` VALUES ('22', '小红', '4', '好评', '呵呵呵呵', '2020-2-14', 'hong.jpg');
INSERT INTO `pinglun` VALUES ('23', '机灵鬼', '4', '好评', '我真是个小机灵鬼', '2020-2-14', 'tou.jpg');
INSERT INTO `pinglun` VALUES ('24', '机灵鬼', '4', '好评', '我真是个了不起的小家伙', '2020-2-14', 'tou.jpg');
INSERT INTO `pinglun` VALUES ('25', '机灵鬼', '2', '中评', '本次项目打个三分吧距离心里所想有差距', '2020-2-14', 'tou.jpg');
INSERT INTO `pinglun` VALUES ('26', '机灵鬼', '2', '中评', '33333333333', '2020-2-14', 'tou.jpg');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` char(100) CHARACTER SET utf8 DEFAULT NULL,
  `price` int(100) DEFAULT NULL,
  `pid` int(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1', '火焰鸡翅', '40', '1', '../images/t1.jpg');
INSERT INTO `shop` VALUES ('2', '五花肉岩烧', '30', '1', '../images/t2.jpg');
INSERT INTO `shop` VALUES ('3', '秘制羊腿排', '55', '1', '../images/t3.jpg');
INSERT INTO `shop` VALUES ('4', '蓝焰海螺', '100', '1', '../images/t4.jpg');
INSERT INTO `shop` VALUES ('5', '芝士土豆', '29', '1', '../images/t5.jpg');
INSERT INTO `shop` VALUES ('6', '香辣牛肉串', '6', '2', '../images/k1.jpg');
INSERT INTO `shop` VALUES ('7', '烤馒头', '5', '2', '../images/k2.jpg');
INSERT INTO `shop` VALUES ('8', '烤羊排', '20', '2', '../images/k3.jpg');
INSERT INTO `shop` VALUES ('9', '烤鸡皮', '5', '2', '../images/k4.jpg');
INSERT INTO `shop` VALUES ('10', '台湾烤肠', '10', '2', '../images/k5.jpg');
INSERT INTO `shop` VALUES ('11', '烤鱼', '20', '2', '../images/k6.jpg');
INSERT INTO `shop` VALUES ('12', '烤五花肉', '10', '2', '../images/k7.jpg');
INSERT INTO `shop` VALUES ('13', '烤蛤蜊', '30', '2', '../images/k8.jpg');
INSERT INTO `shop` VALUES ('14', '葱香烤肉', '10', '2', '../images/k9.jpg');
INSERT INTO `shop` VALUES ('15', '豆皮香菜', '3', '2', '../images/k10.jpg');
INSERT INTO `shop` VALUES ('16', '烤尖椒', '4', '2', '../images/k11.jpg');
INSERT INTO `shop` VALUES ('17', '烤鸡丁', '5', '2', '../images/k12.jpg');
INSERT INTO `shop` VALUES ('18', '炒方便面', '10', '3', '../images/z1.jpg');
INSERT INTO `shop` VALUES ('19', '生蚝炒饭', '29', '3', '../images/z2.jpg');
INSERT INTO `shop` VALUES ('20', '面块汤', '10', '3', '../images/z3.jpg');
INSERT INTO `shop` VALUES ('21', '桂林米粉', '10', '3', '../images/z4.jpg');
INSERT INTO `shop` VALUES ('22', '香辣豆干', '20', '3', '../images/z5.jpg');
INSERT INTO `shop` VALUES ('23', '酱牛肉', '50', '3', '../images/z6.jpg');
INSERT INTO `shop` VALUES ('24', '香辣兔肉', '49', '3', '../images/z7.jpg');
INSERT INTO `shop` VALUES ('25', '红枣桂圆茶', '20', '4', '../images/y1.jpg');
INSERT INTO `shop` VALUES ('26', '椰香红豆', '20', '4', '../images/y2.jpg');
INSERT INTO `shop` VALUES ('27', '鲜榨苹果雪梨汁', '25', '4', '../images/y3.jpg');
INSERT INTO `shop` VALUES ('28', '菊花山楂枸杞茶', '25', '4', '../images/y4.jpg');
INSERT INTO `shop` VALUES ('29', '洛神梅子茶', '39', '4', '../images/y5.jpg');
INSERT INTO `shop` VALUES ('30', '焦糖布丁', '20', '4', '../images/y6.jpg');
INSERT INTO `shop` VALUES ('31', '夏日风情', '15', '4', '../images/y7.jpg');
INSERT INTO `shop` VALUES ('32', '盆栽冰淇淋', '49', '4', '../images/y8.jpg');
INSERT INTO `shop` VALUES ('33', '扎啤', '10', '4', '../images/y9.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `username` char(40) CHARACTER SET utf8 DEFAULT NULL,
  `password` char(40) CHARACTER SET utf8 DEFAULT NULL,
  `name` char(40) CHARACTER SET utf8 DEFAULT NULL,
  `number` char(100) CHARACTER SET utf8 DEFAULT NULL,
  `count` char(100) CHARACTER SET utf8 DEFAULT NULL,
  `tou` varchar(100) CHARACTER SET utf8 DEFAULT 'moren.jpg',
  `ge` varchar(50) CHARACTER SET utf8 DEFAULT '未知',
  `diqu` varchar(50) CHARACTER SET utf8 DEFAULT '未知',
  `work` varchar(50) CHARACTER SET utf8 DEFAULT '未知',
  `sex` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT '未知',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'qk@qq.com', '123123', '青稞', null, null, 'moren.jpg', '未知', '未知', '未知', '未知');
INSERT INTO `user` VALUES ('2', 'xg@163.com', '123123', '小刚', null, null, 'cat.jpg', '未知', '未知', '未知', '未知');
INSERT INTO `user` VALUES ('4', 'jq@qq.com', '123123', '王五', null, null, 'moren.jpg', '未知', '未知', '未知', '未知');
INSERT INTO `user` VALUES ('8', 'acc@qq.com', '123123', '机灵鬼', '1,2,', '1,1,', 'tou.jpg', '这是一条个性签名', '河北省唐山市', '计算机', '男');
INSERT INTO `user` VALUES ('10', '11@qq.com', '123123', '小红', null, null, 'hong.jpg', '这只是一头猪', '后山', '养猪', '男');
