var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var serverSqlMap = require('./serverSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    //////////////////web端//////////////////

    //系统参数操作
    sys_par_get_all: function (sys, callback) {
        pool.query(serverSqlMap.sys_par_get_all, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },

    sys_par_select_key: function (sys, callback) {
        pool.query(serverSqlMap.sys_par_select_key, sys.keyword, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },

    sys_par_update: function (sys, callback) {
        pool.query(serverSqlMap.sys_par_update, [sys.name, sys.keyword, sys.value, sys.keyword], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    sys_par_delete: function (sys, callback) {
        pool.query(serverSqlMap.sys_par_delete, sys.keyword, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },

    sys_par_inster: function (sys, callback) {
        pool.query(serverSqlMap.sys_par_inster, [sys.name, sys.keyword, sys.value], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },

    //数据字典操作
    sys_dict_get_all: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_get_all, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },

    sys_dict_select_code: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_select_code, [sys.key, sys.key], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },

    sys_dict_update: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_update, [sys.name, sys.descript, sys.code], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    sys_dict_delete: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_delete, sys.code, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    sys_dict_detail_delete: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_detail_delete, sys.code, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },


    sys_dict_inster: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_inster, [sys.code, sys.name, sys.descript], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },


    ///数据字典 dict_detail

    sys_dict_detail_select_code: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_detail_select_code, sys.key, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    sys_dict_detail_update: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_detail_update, [sys.text, sys.value, sys.is_default, sys.id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    sys_dict_detail_id_delete: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_detail_id_delete, sys.id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },

    sys_dict_detail_inster: function (sys, callback) {
        pool.query(serverSqlMap.sys_dict_detail_inster, [sys.dict_code, sys.text, sys.value, sys.is_default], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    //////////////////////////////////////


    user_select_name: function (user, callback) {
        pool.query(serverSqlMap.user_select_name, [user.username, user.password], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    class_and_course_select: function (user, callback) {
        pool.query(serverSqlMap.class_and_course_select, user.selectKeyWord, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    class_and_course_update: function (user, callback) {
        pool.query(serverSqlMap.class_and_course_update, user.selectKeyWord, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    w_user_select: function (user, callback) {
        pool.query(serverSqlMap.w_user_select, [user.selectIdentity, user.selectNum, user.selectSchool, user.selectCollege], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    p_sign: function (user, callback) {
        //console.log(user.selectSchool);
        pool.query(serverSqlMap.p_sign, [user.selectSchool, user.selectCollege, user.selectNum], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    c_sign: function (user, callback) {
        //console.log(user.selectSchool);
        pool.query(serverSqlMap.c_sign, [user.selectSchool, user.selectCollege, user.selectCourse], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    q_role_select: function (user, callback) {
        console.log(user);
        pool.query(serverSqlMap.q_role_select, user.selectSchool, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    q_role_insert: function (user, callback) {
        //console.log(user);
        pool.query(serverSqlMap.q_role_insert, [user.number, user.name, user.identity, user.school], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    q_role_update: function (user, callback) {
        //console.log(user);
        pool.query(serverSqlMap.q_role_update, [user.number, user.identity, user.school, user.name], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    }
};
