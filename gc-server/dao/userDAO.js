var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    //////////////////app端//////////////////

 
    select_telphone:function (user,callback) {
        pool.query(userSqlMap.select_telphone,user.telphone, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },

    select_pass:function (user,callback) {
        pool.query(userSqlMap.select_pass,user.pass, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    add: function (user, callback) {
        pool.query(userSqlMap.add, [user.name, user.role,user.studyNumber,user.telphone,user.pass], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    change_pass:function (user, callback) {
        pool.query(userSqlMap.change_pass, [user.pass, user.telphone], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    update_appInfo:function (user, callback) {
        pool.query(userSqlMap.update_appInfo, [user.name,user.sex,user.born,user.studyNumber,user.telphone], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    update_telphone:function (user, callback) {
        pool.query(userSqlMap.update_telphone, [user.after_tel,user.before_tel], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    add_feedback:function (user, callback) {
        pool.query(userSqlMap.add_feedback, [user.role,user.telphone,user.content], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },



    //////////////////web端//////////////////
};
