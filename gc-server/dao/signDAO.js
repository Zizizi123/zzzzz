var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var signSqlMap = require('./signSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {


    //////////////////app端//////////////////



    //老师端
    get_signState:function (sign,callback) {
        pool.query(signSqlMap.get_signState,sign.NOClass, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sign_start:function (sign,callback) {
        pool.query(signSqlMap.sign_start,[sign.Class_No,sign.signing_state], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    select_teacherTime:function (sign,callback) {
        pool.query(signSqlMap.select_teacherTime,sign.Class_No, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sign_end:function (sign,callback) {
        pool.query(signSqlMap.sign_end,[sign.NOClass,sign.NOClass], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    check_sign_state:function (sign,callback) {
        pool.query(signSqlMap.check_sign_state,[sign.NOClass,sign.NOClass], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    select_ClassCourseMember2:function (sign,callback) {
        pool.query(signSqlMap.select_ClassCourseMember2,[sign.NOClass,0,sign.NOClass], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    select_ClassNotSignMember:function (sign,callback) {
        pool.query(signSqlMap.select_ClassNotSignMember,[sign.NOClass,sign.NOClass,sign.NOClass,sign.NOClass], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sql_student_search:function (sign,callback) {
        pool.query(signSqlMap.sql_student_search,[sign.user.telphone,sign.NOClass,sign.NOClass], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sql_change_sign:function (sign,callback) {
        pool.query(signSqlMap.sql_change_sign,[sign.stateChosen,sign.user.telphone,sign.NOClass,sign.NOClass], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    sql_sign_stu:function (sign,callback) {
        pool.query(signSqlMap.sql_sign_stu,[sign.NOClass,sign.user.telphone,sign.stateChosen,sign.NOClass], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    select_showSignDetail:function (sign,callback) {
        pool.query(signSqlMap.select_showSignDetail,[sign.NOClass,sign.telphone], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sql_time_signN:function (sign,callback) {
        pool.query(signSqlMap.sql_time_signN,sign.Class_No, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sql_SignState:function (sign,callback) {
        pool.query(signSqlMap.sql_SignState,[sign.Class_No,sign.teacher_time,sign.Class_No,sign.teacher_time], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },

    //学生端
    sign_teacher:function (sign,callback) {
        pool.query(signSqlMap.sign_teacher,[sign.Class_No,sign.Class_No], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    signed_or_not:function (sign,callback) {
        pool.query(signSqlMap.signed_or_not,[sign.Class_No,sign.telephone], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sign_update:function (sign,callback) {
        pool.query(signSqlMap.sign_update,[sign.telphone,sign.Class_No], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    sign_stu:function (sign,callback) {
        pool.query(signSqlMap.sign_stu,[sign.Class_No,sign.telephone,sign.Class_No], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    //////////////////web端//////////////////






};
