var userSqlMap = {

    //////////////////app端//////////////////

    select_telphone: 'select * from user where User_Telephone=?',       //查询数据库手机号
    select_pass: 'select * from user where User_Pass = ?',               //查询数据库密码
    add: 'insert into user(Id,User_Name,User_Type,User_No,User_Telephone,User_Pass) values (0,?,?,?,?,?)',//将注册的用户信息插入到数据库中
    change_pass: 'update user set User_Pass = ? where User_Telephone= ?',      //修改密码
    update_appInfo: 'update user set User_Name= ?,User_Sex= ?,User_Born= ?,User_No= ? where User_Telephone= ?',//更新个人信息
    update_telphone: 'update user set User_Telephone= ? where User_Telephone= ?', //更换手机号
    add_feedback: 'insert into users_feedback(id,role,telphone,content,create_date) values (0,?,?,?,now())',//插入用户反馈

    //////////////////web端//////////////////

};

module.exports = userSqlMap;