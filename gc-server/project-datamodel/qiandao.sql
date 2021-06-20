/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 80015
Source Host           : localhost:3306
Source Database       : qiandao

Target Server Type    : MYSQL
Target Server Version : 80015
File Encoding         : 65001

Date: 2019-06-30 22:57:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Class_Id` int(16) NOT NULL,
  `User_Id` int(16) DEFAULT NULL,
  `State` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Class_Id_attend` (`Class_Id`) USING BTREE,
  KEY `User_Id_attend` (`User_Id`) USING BTREE,
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`Class_Id`) REFERENCES `class` (`Id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='InnoDB free: 3072 kB; (`User_ID`) REFER `project/user`(`Id`)';

-- ----------------------------
-- Records of attendance
-- ----------------------------
INSERT INTO `attendance` VALUES ('1', '24', null, null, null, '2019-05-29 22:54:01', null, null);
INSERT INTO `attendance` VALUES ('2', '25', null, null, null, '2019-05-29 22:57:06', null, null);
INSERT INTO `attendance` VALUES ('3', '5', null, null, null, '2019-05-29 11:28:57', null, null);
INSERT INTO `attendance` VALUES ('4', '6', null, null, null, '2019-05-29 11:30:14', null, null);
INSERT INTO `attendance` VALUES ('5', '19', null, null, null, '2019-05-29 15:06:50', null, null);
INSERT INTO `attendance` VALUES ('6', '20', null, null, null, '2019-05-29 15:08:57', null, null);
INSERT INTO `attendance` VALUES ('7', '21', null, null, null, '2019-05-29 16:36:04', null, null);
INSERT INTO `attendance` VALUES ('8', '22', null, null, null, '2019-05-29 16:37:37', null, null);
INSERT INTO `attendance` VALUES ('14', '26', null, null, null, '2019-06-01 21:52:48', null, null);
INSERT INTO `attendance` VALUES ('15', '27', null, null, null, '2019-06-02 21:47:32', null, null);

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Course_Id` int(16) NOT NULL,
  `Class_No` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Class_Name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Class_Place` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `progress` int(11) DEFAULT '1',
  `Teacher_Id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Teacher_Name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL COMMENT 'CURRENT_TIMESTAMP',
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `LastSignTime` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Course_Id_class` (`Course_Id`) USING BTREE,
  KEY `Class_No` (`Class_No`),
  CONSTRAINT `class_fk` FOREIGN KEY (`Course_Id`) REFERENCES `course` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('5', '6', '1361', '2018级专硕1班', '数计学院2号楼203', '1', '17805949771', '杜小德', null, '2019-05-29 11:28:57', null, '2019-05-31 22:36:15', null);
INSERT INTO `class` VALUES ('6', '7', '2897', '2018级专硕2班', '数计学院2号楼203', '1', '17805949771', '杜小德', null, '2019-05-29 11:30:14', null, '2019-05-31 22:36:17', null);
INSERT INTO `class` VALUES ('19', '30', '1TQ8', '2018级专硕1班', '东三304', '1', '17805949771', '任一心', null, '2019-05-29 15:06:50', null, '2019-05-31 22:36:19', null);
INSERT INTO `class` VALUES ('20', '31', 'LWPK', '2018级专硕2班', '东三304', '1', '17805949771', '任一心', null, '2019-05-29 15:08:57', null, '2019-05-31 22:36:20', null);
INSERT INTO `class` VALUES ('21', '32', '35Q8', '1班', '东三204', '1', '18659947856', '陈蓝', null, '2019-05-29 16:36:04', null, '2019-06-30 10:03:40', null);
INSERT INTO `class` VALUES ('22', '33', 'BUCI', '2班', '东三201', '1', '18659947856', '陈蓝', null, '2019-05-29 16:37:37', null, '2019-05-31 22:36:22', null);
INSERT INTO `class` VALUES ('24', '35', 'SC7E', '1班', '数计2号楼301', '1', '18659947856', '小红', null, '2019-05-29 22:54:01', null, '2019-05-31 22:36:23', null);
INSERT INTO `class` VALUES ('25', '36', 'HLNS', '2班', '数计2号楼301', '1', '18659947856', '小红', null, '2019-05-29 22:57:06', null, '2019-05-31 22:41:11', null);
INSERT INTO `class` VALUES ('26', '37', 'IMEG', '2018专硕5班', '东三203', '1', '18659947856', '池自飘', null, '2019-06-01 21:52:48', null, '2019-06-01 21:52:48', null);
INSERT INTO `class` VALUES ('27', '38', 'X6JW', '智障技术', '东三205', '1', '18659947856', '小红', null, '2019-06-02 21:47:32', null, '2019-06-04 09:12:29', null);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Course_Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `School` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Institute` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Course_Term` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Course_Week` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Course_Require` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Course_proceed` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Course_Exam` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Createby` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Createdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `Modifyby` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Modifydate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('6', '工程实训', '福大数计学院', null, '2018-2019第二学期', '11周', '无', '无', '2019年6月15号考试', null, '2019-05-29 11:28:57', null, '2019-06-30 12:44:06');
INSERT INTO `course` VALUES ('7', '工程实训', '福大数计学院', null, '2018-2019第二学期', '11周', '无', '无', '2019年6月15号考试', null, '2019-05-29 11:30:14', null, '2019-05-30 21:45:07');
INSERT INTO `course` VALUES ('30', '智能技术', '福大数计学院', null, '2018-2019第2学期', '18周', '无', '无', '2019年6月28日考试', null, '2019-05-29 15:06:50', null, '2019-05-30 21:45:11');
INSERT INTO `course` VALUES ('31', '智能技术', '福大数计学院', null, '2018-2019第2学期', '18周', '无', '无', '2019年6月28日考试', null, '2019-05-29 15:08:57', null, '2019-05-30 21:45:13');
INSERT INTO `course` VALUES ('32', '专业英语', '福大数计学院', null, '2018-2019第2学期', '11周', '无', '无', '无', null, '2019-05-29 16:36:04', null, '2019-06-30 10:04:44');
INSERT INTO `course` VALUES ('33', '专业英语', '福大数计学院', null, '2018-2019第2学期', '11周', '无', '无', '无', null, '2019-05-29 16:37:37', null, '2019-05-30 21:45:18');
INSERT INTO `course` VALUES ('35', '信息安全', '福大数计学院', null, '2018-2019第2学期', '11周', '无', '无', '无', null, '2019-05-29 22:54:01', null, '2019-05-30 21:45:21');
INSERT INTO `course` VALUES ('36', '信息安全', '福大数计学院', null, '2018-2019第2学期', '11周', '无', '无', '无', null, '2019-05-29 22:57:06', null, '2019-05-30 21:45:24');
INSERT INTO `course` VALUES ('37', '人工智障', '数学与计算机学院', null, '2018-2019第2学期', '15周', '牛逼', '0', '全挂', null, '2019-06-01 21:52:48', null, '2019-06-04 09:11:55');
INSERT INTO `course` VALUES ('38', '智障工程', '福州大学数计学院', null, '2018-2019第2学期', '18周', '无', '无', '无', null, '2019-06-02 21:47:32', null, '2019-06-04 09:12:06');

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Code` varchar(16) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for dictionarydetail
-- ----------------------------
DROP TABLE IF EXISTS `dictionarydetail`;
CREATE TABLE `dictionarydetail` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Dictionary_Id` int(16) NOT NULL,
  `ItemKey` int(16) DEFAULT NULL,
  `ItemValue` varchar(32) DEFAULT NULL,
  `IsDefault` bit(1) DEFAULT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Dictionary_Id` (`Dictionary_Id`) USING BTREE,
  CONSTRAINT `dictionarydetail_ibfk_1` FOREIGN KEY (`Dictionary_Id`) REFERENCES `dictionary` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='InnoDB free: 4096 kB; (`Dictionary_Id`) REFER `project/dicti';

-- ----------------------------
-- Records of dictionarydetail
-- ----------------------------

-- ----------------------------
-- Table structure for joinclass
-- ----------------------------
DROP TABLE IF EXISTS `joinclass`;
CREATE TABLE `joinclass` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Class_No` varchar(255) NOT NULL,
  `telphone` varchar(255) DEFAULT NULL,
  `Createby` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL COMMENT 'CURRENT_TIMESTAMP',
  `Modifyby` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Modifydate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'CURRENT_TIMESTAMP',
  PRIMARY KEY (`Id`),
  KEY `telphone_fk` (`telphone`),
  KEY `ClassNo_fk` (`Class_No`),
  CONSTRAINT `ClassNo_fk` FOREIGN KEY (`Class_No`) REFERENCES `class` (`Class_No`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `telphone_fk` FOREIGN KEY (`telphone`) REFERENCES `user` (`User_Telephone`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of joinclass
-- ----------------------------
INSERT INTO `joinclass` VALUES ('10', 'SC7E', '17805949770', null, '2019-05-30 16:46:10', null, null);
INSERT INTO `joinclass` VALUES ('11', '35Q8', '17805949770', null, '2019-05-30 17:46:19', null, null);
INSERT INTO `joinclass` VALUES ('12', 'LWPK', '17805949770', null, '2019-05-30 23:53:23', null, null);
INSERT INTO `joinclass` VALUES ('15', 'X6JW', '15659100305', null, '2019-06-02 22:21:12', null, null);
INSERT INTO `joinclass` VALUES ('19', 'IMEG', '15260100725', null, '2019-06-04 09:36:12', null, null);
INSERT INTO `joinclass` VALUES ('20', 'IMEG', '15659100305', null, '2019-06-04 09:57:35', null, null);
INSERT INTO `joinclass` VALUES ('22', '1361', '15659100305', null, '2019-06-30 12:00:21', null, null);
INSERT INTO `joinclass` VALUES ('23', 'IMEG', '17805949770', null, '2019-06-30 21:14:51', null, null);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Parent_Id` int(16) NOT NULL,
  `Menu_Name` varchar(16) NOT NULL,
  `Url` varchar(255) DEFAULT NULL,
  `Icon` varchar(255) DEFAULT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createtime` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifytime` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Parent_Id_menu` (`Parent_Id`) USING BTREE,
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`Parent_Id`) REFERENCES `menu` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Role_Name` varchar(16) NOT NULL,
  `Role_Code` varchar(255) DEFAULT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for rolemenu
-- ----------------------------
DROP TABLE IF EXISTS `rolemenu`;
CREATE TABLE `rolemenu` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Role_Id` int(16) NOT NULL,
  `Menu_Id` int(16) NOT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createtime` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifytime` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Role_Id_menu` (`Role_Id`) USING BTREE,
  KEY `Menu_Id_role` (`Menu_Id`) USING BTREE,
  CONSTRAINT `rolemenu_ibfk_1` FOREIGN KEY (`Menu_Id`) REFERENCES `menu` (`Id`),
  CONSTRAINT `rolemenu_ibfk_2` FOREIGN KEY (`Role_Id`) REFERENCES `role` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rolemenu
-- ----------------------------

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `Id` int(16) NOT NULL,
  `Class_Id` int(16) NOT NULL,
  `User_Id` int(16) NOT NULL,
  `CourseScore` double(16,0) NOT NULL,
  `ExamScore` double(16,0) NOT NULL,
  `FinalScore` double(16,0) NOT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `User_Id_score` (`User_Id`) USING BTREE,
  KEY `Class_Id_score` (`Class_Id`) USING BTREE,
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`Class_Id`) REFERENCES `class` (`Id`),
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='InnoDB free: 3072 kB; (`ClassCousre_Id`) REFER `project/user';

-- ----------------------------
-- Records of score
-- ----------------------------

-- ----------------------------
-- Table structure for sign_student
-- ----------------------------
DROP TABLE IF EXISTS `sign_student`;
CREATE TABLE `sign_student` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Class_No` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `student_place` varchar(255) DEFAULT NULL,
  `teacher_place` varchar(255) DEFAULT NULL,
  `distance` varchar(255) DEFAULT NULL,
  `student_time` datetime DEFAULT NULL,
  `teacher_time` datetime DEFAULT NULL,
  `SignState` int(255) DEFAULT '0' COMMENT ' //normal1 late2 absence3 leave4   lackOfSign0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign_student
-- ----------------------------
INSERT INTO `sign_student` VALUES ('42', 'IMEG', '15659100305', null, null, null, '2019-06-02 10:58:51', '2019-06-02 10:58:58', '2');
INSERT INTO `sign_student` VALUES ('44', 'IMEG', '15659100305', null, null, null, '2019-06-02 18:11:36', '2019-06-02 17:55:15', '2');
INSERT INTO `sign_student` VALUES ('45', 'IMEG', '15659100305', null, null, null, '2019-06-02 18:26:02', '2019-06-02 18:26:00', '2');
INSERT INTO `sign_student` VALUES ('46', 'IMEG', '15659100305', null, null, null, '2019-06-02 18:46:45', '2019-06-02 18:46:40', '2');
INSERT INTO `sign_student` VALUES ('47', 'IMEG', '15659100305', null, null, null, '2019-06-02 19:17:10', '2019-06-02 19:15:43', '2');
INSERT INTO `sign_student` VALUES ('48', 'IMEG', '15659100305', null, null, null, '2019-06-02 20:04:56', '2019-06-02 20:04:50', '2');
INSERT INTO `sign_student` VALUES ('49', 'IMEG', '15659100305', null, null, null, '2019-06-02 21:29:46', '2019-06-02 21:25:57', '1');
INSERT INTO `sign_student` VALUES ('50', 'IMEG', '15260100725', null, null, null, '2019-06-02 21:32:46', '2019-06-02 21:25:57', '3');
INSERT INTO `sign_student` VALUES ('51', 'IMEG', '15260100725', null, null, null, '2019-06-05 15:16:29', '2019-06-05 15:10:15', '3');
INSERT INTO `sign_student` VALUES ('52', 'IMEG', '15260100725', null, null, null, '2019-06-05 15:16:55', '2019-06-05 15:16:36', '3');
INSERT INTO `sign_student` VALUES ('53', 'IMEG', '15659100305', null, null, null, '2019-06-05 15:16:59', '2019-06-05 15:16:36', '4');
INSERT INTO `sign_student` VALUES ('54', '1361', '17805949770', null, null, null, '2019-06-30 18:24:19', '2019-06-30 18:24:09', '1');
INSERT INTO `sign_student` VALUES ('55', '1361', '15659100305', null, null, null, '2019-06-30 18:24:43', '2019-06-30 18:24:09', '3');
INSERT INTO `sign_student` VALUES ('56', '35Q8', '17805949770', null, null, null, '2019-06-30 21:10:50', '2019-06-30 21:10:40', '1');
INSERT INTO `sign_student` VALUES ('58', 'IMEG', '17805949770', null, null, null, '2019-06-30 22:12:14', '2019-06-05 15:28:05', '1');
INSERT INTO `sign_student` VALUES ('59', 'X6JW', '15659100305', null, null, null, '2019-06-30 22:15:29', '2019-06-30 22:15:22', '1');
INSERT INTO `sign_student` VALUES ('60', 'X6JW', '15659100305', null, null, null, '2019-06-30 22:15:46', '2019-06-30 22:15:38', '3');

-- ----------------------------
-- Table structure for sign_teacher
-- ----------------------------
DROP TABLE IF EXISTS `sign_teacher`;
CREATE TABLE `sign_teacher` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Class_No` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher_time` datetime DEFAULT NULL,
  `teacher_place` varchar(255) DEFAULT NULL,
  `signing_state` int(11) DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign_teacher
-- ----------------------------
INSERT INTO `sign_teacher` VALUES ('88', 'IMEG', '2019-06-02 10:58:58', null, '0');
INSERT INTO `sign_teacher` VALUES ('94', 'IMEG', '2019-06-02 17:55:15', null, '0');
INSERT INTO `sign_teacher` VALUES ('98', 'IMEG', '2019-06-02 18:26:00', null, '0');
INSERT INTO `sign_teacher` VALUES ('101', 'IMEG', '2019-06-02 18:46:40', null, '0');
INSERT INTO `sign_teacher` VALUES ('102', 'IMEG', '2019-06-02 19:15:43', null, '0');
INSERT INTO `sign_teacher` VALUES ('111', 'IMEG', '2019-06-02 20:04:50', null, '0');
INSERT INTO `sign_teacher` VALUES ('118', 'IMEG', '2019-06-02 21:25:57', null, '0');
INSERT INTO `sign_teacher` VALUES ('126', 'IMEG', '2019-06-05 15:10:15', null, '0');
INSERT INTO `sign_teacher` VALUES ('127', 'IMEG', '2019-06-05 15:16:36', null, '0');
INSERT INTO `sign_teacher` VALUES ('128', 'IMEG', '2019-06-05 15:17:23', null, '0');
INSERT INTO `sign_teacher` VALUES ('129', 'IMEG', '2019-06-05 15:17:43', null, '0');
INSERT INTO `sign_teacher` VALUES ('130', 'IMEG', '2019-06-05 15:23:47', null, '0');
INSERT INTO `sign_teacher` VALUES ('131', 'IMEG', '2019-06-05 15:27:45', null, '0');
INSERT INTO `sign_teacher` VALUES ('132', 'IMEG', '2019-06-05 15:28:05', null, '0');
INSERT INTO `sign_teacher` VALUES ('133', '2897', '2019-06-30 14:24:20', null, '0');
INSERT INTO `sign_teacher` VALUES ('134', '1361', '2019-06-30 14:42:12', null, '0');
INSERT INTO `sign_teacher` VALUES ('135', '1TQ8', '2019-06-30 14:59:52', null, '0');
INSERT INTO `sign_teacher` VALUES ('136', '1TQ8', '2019-06-30 15:08:32', null, '0');
INSERT INTO `sign_teacher` VALUES ('137', '1TQ8', '2019-06-30 15:09:35', null, '0');
INSERT INTO `sign_teacher` VALUES ('155', '1361', '2019-06-30 16:22:16', null, '0');
INSERT INTO `sign_teacher` VALUES ('156', '1361', '2019-06-30 16:28:01', null, '0');
INSERT INTO `sign_teacher` VALUES ('157', '1361', '2019-06-30 16:28:22', null, '0');
INSERT INTO `sign_teacher` VALUES ('158', '2897', '2019-06-30 16:48:50', null, '0');
INSERT INTO `sign_teacher` VALUES ('159', '2897', '2019-06-30 16:48:55', null, '0');
INSERT INTO `sign_teacher` VALUES ('160', '1TQ8', '2019-06-30 16:56:13', null, '0');
INSERT INTO `sign_teacher` VALUES ('161', '1361', '2019-06-30 17:37:50', null, '0');
INSERT INTO `sign_teacher` VALUES ('162', '1TQ8', '2019-06-30 17:46:11', null, '0');
INSERT INTO `sign_teacher` VALUES ('163', '2897', '2019-06-30 17:46:20', null, '0');
INSERT INTO `sign_teacher` VALUES ('164', '1361', '2019-06-30 17:48:50', null, '0');
INSERT INTO `sign_teacher` VALUES ('165', 'LWPK', '2019-06-30 17:50:35', null, '0');
INSERT INTO `sign_teacher` VALUES ('166', 'LWPK', '2019-06-30 17:50:39', null, '0');
INSERT INTO `sign_teacher` VALUES ('167', 'LWPK', '2019-06-30 17:50:46', null, '0');
INSERT INTO `sign_teacher` VALUES ('168', '2897', '2019-06-30 17:52:31', null, '0');
INSERT INTO `sign_teacher` VALUES ('169', '1361', '2019-06-30 17:53:16', null, '0');
INSERT INTO `sign_teacher` VALUES ('170', '1361', '2019-06-30 18:24:09', null, '0');
INSERT INTO `sign_teacher` VALUES ('171', '1361', '2019-06-30 20:27:53', null, '0');
INSERT INTO `sign_teacher` VALUES ('176', '35Q8', '2019-06-30 21:13:07', null, '0');
INSERT INTO `sign_teacher` VALUES ('177', 'X6JW', '2019-06-30 22:14:15', null, '0');
INSERT INTO `sign_teacher` VALUES ('178', 'X6JW', '2019-06-30 22:15:22', null, '0');
INSERT INTO `sign_teacher` VALUES ('179', 'X6JW', '2019-06-30 22:15:38', null, '0');
INSERT INTO `sign_teacher` VALUES ('180', 'X6JW', '2019-06-30 22:37:31', null, '0');
INSERT INTO `sign_teacher` VALUES ('181', 'IMEG', '2019-06-30 22:50:22', null, '0');
INSERT INTO `sign_teacher` VALUES ('182', 'IMEG', '2019-06-30 22:51:34', null, '0');
INSERT INTO `sign_teacher` VALUES ('183', 'IMEG', '2019-06-30 22:52:18', null, '0');
INSERT INTO `sign_teacher` VALUES ('189', '35Q8', '2019-06-30 22:54:12', null, '0');
INSERT INTO `sign_teacher` VALUES ('190', '35Q8', '2019-06-30 22:54:52', null, '0');
INSERT INTO `sign_teacher` VALUES ('191', '35Q8', '2019-06-30 22:55:14', null, '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Id` int(50) NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `User_Type` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `User_No` int(50) NOT NULL,
  `User_Telephone` varchar(255) DEFAULT NULL,
  `User_Pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `User_Sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `User_Born` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `User_School` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `User_Institute` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `User_Telephone` (`User_Telephone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'wood', 'student', '180327068', '17805949770', 'aA123456', '男', '1997.12', null, null, null, '2019-05-22 09:34:39', null, '2019-05-22 09:57:38');
INSERT INTO `user` VALUES ('2', '郑小明', 'teacher', '180356459', '17805949771', 'sS111111', '男', '1995.1', null, null, null, '2019-05-22 09:36:47', null, '2019-05-22 09:56:24');
INSERT INTO `user` VALUES ('3', '池之标', 'teacher', '180366251', '18659947856', 'bB111111', '男', '1985.12', null, null, null, '2019-05-29 16:33:35', null, '2019-06-04 09:09:45');
INSERT INTO `user` VALUES ('4', '郑沐', 'student', '180327091', '15659100305', 'aA123456789', '男', '1997.2', null, null, null, '2019-05-31 21:24:01', null, '2019-06-29 21:56:55');
INSERT INTO `user` VALUES ('5', '李飘', 'student', '180327092', '15260100725', 'aB123456', null, null, null, null, null, '2019-06-02 14:41:12', null, '2019-06-04 09:34:58');

-- ----------------------------
-- Table structure for userrole
-- ----------------------------
DROP TABLE IF EXISTS `userrole`;
CREATE TABLE `userrole` (
  `Id` int(16) NOT NULL AUTO_INCREMENT,
  `Role_Id` int(16) NOT NULL,
  `User_Id` int(16) NOT NULL,
  `Createby` varchar(16) DEFAULT NULL,
  `Createdate` datetime DEFAULT NULL,
  `Modifyby` varchar(16) DEFAULT NULL,
  `Modifydate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `User_Id_role` (`User_Id`) USING BTREE,
  KEY `Role_Id_user` (`Role_Id`) USING BTREE,
  CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`Role_Id`) REFERENCES `role` (`Id`),
  CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userrole
-- ----------------------------

-- ----------------------------
-- Table structure for users_feedback
-- ----------------------------
DROP TABLE IF EXISTS `users_feedback`;
CREATE TABLE `users_feedback` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `telphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` text,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_feedback
-- ----------------------------
INSERT INTO `users_feedback` VALUES ('6', 'student', '17805949770', '系统存在闪退的bug，希望尽快解决，更好为客户服务', '2019-05-21 22:36:02');
INSERT INTO `users_feedback` VALUES ('8', 'student', '17805949770', '你好，会出现按钮失灵的现象', '2019-05-22 09:58:29');
