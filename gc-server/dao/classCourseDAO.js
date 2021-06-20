var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var classCourseSqlMap = require('./classCourseSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////app端//////////////////


    //老师端
    add_course: function (classCourse, callback) {
        pool.query(classCourseSqlMap.add_course, [classCourse.keCheng, classCourse.school, classCourse.xueYuan, classCourse.xueQi, classCourse.CourseWeek, classCourse.xueXiYaoQiu, classCourse.JiaoXueJinDu, classCourse.kaoShiAnPai, classCourse.isCreating], function (error, result) {
            if (error) throw error;
            // callback(result.affectedRows > 0);
            callback(result);
        });
    },
    add_class: function (classCourse, callback) {
        pool.query(classCourseSqlMap.add_class, [classCourse.insertId, classCourse.banKeCode, classCourse.banJi, classCourse.place, classCourse.telphone, classCourse.teacherName], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    select_ClassNo: function (classCourse, callback) {
        pool.query(classCourseSqlMap.select_ClassNo, classCourse.banKeCode, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    select_AllClassCourse: function (callback) {
        pool.query(classCourseSqlMap.select_AllClassCourse, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    select_MyClassCourse: function (classCourse, callback) {
        pool.query(classCourseSqlMap.select_MyClassCourse, classCourse.username, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    update_ClassCourse: function (classCourse, callback) {
        pool.query(classCourseSqlMap.update_ClassCourse, [classCourse.Course_Name, classCourse.School, classCourse.Course_Term, classCourse.Course_Week, classCourse.Course_Require, classCourse.Course_proceed, classCourse.Course_Exam, classCourse.Class_Name, classCourse.Class_Place, classCourse.Teacher_Name, classCourse.Class_No], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    select_ClassCourseDetail: function (classCourse, callback) {
        pool.query(classCourseSqlMap.select_ClassCourseDetail, classCourse.NOClass, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    select_teacherCourseMember: function (classCourse, callback) {
        pool.query(classCourseSqlMap.select_teacherCourseMember, classCourse.NOClass, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },



    //学生端
    select_MyJoinClassCourse: function (classCourse, callback) {
        pool.query(classCourseSqlMap.select_MyJoinClassCourse, classCourse.telphone, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    select_joinClass: function (classCourse, callback) {
        pool.query(classCourseSqlMap.select_joinClass, classCourse.NOClass, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    join_classCourse: function (classCourse, callback) {
        pool.query(classCourseSqlMap.join_classCourse, [classCourse.NOClass, classCourse.telphone], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    delete_classCourse: function (classCourse, callback) {
        pool.query(classCourseSqlMap.delete_classCourse, [classCourse.Class_No, classCourse.telphone], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    select_ClassCourseMember: function (classCourse, callback) {
        pool.query(classCourseSqlMap.select_ClassCourseMember, classCourse.NOClass, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },

    //////////////////web端//////////////////





};
