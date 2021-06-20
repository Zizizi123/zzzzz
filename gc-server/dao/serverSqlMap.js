var serverSqlMap = {

    //sys_par 系统参数 
    sys_par_get_all: 'select * from sys_par', //获取全部数据系统参数
    sys_par_select_key: 'select * from sys_par where keyword = ?', //根据code或name查询系统参数
    sys_par_update: 'update sys_par set name = ? , keyword= ?, value = ? where keyword = ?',  //更新系统参数
    sys_par_delete: 'delete from sys_par where keyword=? ',     // 删除系统参数
    sys_par_inster: 'insert into sys_par (name, keyword, value) values (?,?,?)',  //插入系统参数
    //sys 数据字典
    sys_dict_get_all: 'select * from sys_dict', //获取全部数据字典信息
    sys_dict_select_code: 'select * from sys_dict where code=? or name=?', //根据code或name查询字典信息
    sys_dict_update: 'update sys_dict set name = ? , descript = ? where code = ?',  //更新字典信息
    sys_dict_delete: 'delete from sys_dict where code=?',     // 删除字典信息
    sys_dict_detail_delete: 'delete from sys_dict_detail where dict_code=? ',     // 删除字典信息
    sys_dict_inster: 'insert into sys_dict (code, name, descript) values (?,?,?)',  //插入字典信息



    //sys_detail 
    sys_dict_detail_select_code: 'select * from sys_dict_detail where dict_code=?', //根据code或name查询字典信息
    sys_dict_detail_update: 'update sys_dict_detail set text = ? , value = ?,is_default=? where id = ?',  //更新字典信息
    sys_dict_detail_id_delete: 'delete from sys_dict_detail where id=? ',     // 删除字典信息
    sys_dict_detail_inster: 'insert into sys_dict_detail (dict_code, text, value, is_default) values (?,?,?,?)',  //插入字典信息



    //////////////////web端//////////////////
    //user
    user_add: 'insert into user_login( id, username, password) values ( 0, ?, ?)', //用户添加
    user_select_name: 'select * from user_login where username = ? and password = ?',  //查询 username
    user_select_password: 'select * from user_login',                            //查询 password

    //s_course
    s_course_add: 'insert into s_course(id, course, teacher, school, term, time, address, class) ' +
        'values(0,?,?,?,?,?,?,?)',                                                   //添加 course
    s_course_select_course: 'select * from s_course where school = ? and course = ?',//查询 course

    //s_ts_account
    s_ts_account_add: 'insert into s_ts_account(id, identity, num, school, college, name, phone) ' +
        'values(0,?,?,?,?,?,?)',                                                    //添加
    s_ts_account_select_people: 'select * from s_ts_account where identity = ? and num = ? ' +
        'and school = ?',//查询 people
    s_ts_account_update_people: 'update s_ts_account ' +
        'set identity = ? , num = ? , school = ? , college = ?, name = ? , phone = ?',//修改

    //s_sign_situation
    s_sign_situation_add: 'insert into s_sign_situation(id,num,name,identity,school, college,course,class,goal) ' +
        'values(0,?,?,?,?,?,?,?,?)',
    s_sign_situation_select_people:
        'select * from s_sign_situation where num = ? and school = ?',//查询 people
    s_sign_situation_total_goal:
        'select sum(goal) from s_sign_situation where num = ? and school = ?',//统计 goal

    ////////////////////for_wood_database//////////////////////////

    //class
    class_add: 'insert into class(Id,Course_Id,Class_No,Class_Name,Class_Place,progress,Teacher_Id,Teacher_Name,Createby,' +
        'Createdate,Modifyby,Modifydate,LastSignTime) values(0,?,?,?,?,?,?,?,?,?,?,?,?)',
    class_select: 'select * from class',

    //class_and_course  //班级和课程联合
    class_and_course_select: 'select * from course a left outer join class b on a.Id=b.Course_Id where a.Course_Name = ?',
    class_and_course_update: '',

    //w_user
    w_user_select: 'select * from user where User_Type = ? and User_No = ? and User_School = ? and User_Institute = ?',

    //学生签到详情
    p_sign: 'select * from user a,sign_student b, class c , course d where a.User_Telephone = b.telphone and b.Class_No = c.Class_No and c.Course_Id = d.Id and a.User_School = ? and a.User_Institute = ? and a.User_No = ? ',

    //课程签到详情
    c_sign: 'select a.User_No,a.User_Name,a.User_Type,a.User_School,d.Course_Name,c.Class_Name,SUM(6-b.SignState) as acc_goals,COUNT(b.SignState)*5 as total\n' +
        'from gc.user a,gc.sign_student b, gc.class c , gc.course d \n' +
        'where a.User_Telephone=b.telphone and b.Class_No=c.Class_No and c.Course_Id=d.Id\n' +
        'group by a.User_No,a.User_Name,a.User_Type,a.User_School,d.Course_Name,c.Class_Name',
    //人员角色管理
    q_role_select: 'select User_No,User_Name,User_Type,User_School from user where User_Type = ?',
    q_role_insert: 'insert into user (User_No,User_Name,User_Type,User_School) values (?,?,?,?)',
    q_role_update: 'update user set User_No = ? , User_Type = ? , User_School = ? where User_Name = ? ',


};

module.exports = serverSqlMap;


