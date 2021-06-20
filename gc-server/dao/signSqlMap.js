var signSqlMap = {

    //////////////////app端//////////////////


    //老师端
    get_signState:'select signing_state,teacher_time from sign_teacher where teacher_time=(SELECT maxTime from (select max(teacher_time) as maxTime from sign_teacher where Class_No=?) as timer)',
    sign_start:'insert into sign_teacher(Class_No,teacher_time,signing_state) values(?,(now()),?)',//发起签到
    select_teacherTime:'select teacher_time from sign_teacher where Class_No=? and signing_state!=0',//查询发起签到的时间
    sign_end:'update sign_teacher set signing_state=0 where Class_No=? and teacher_time=(SELECT maxTime from (select max(teacher_time) as maxTime from sign_teacher where Class_No=?) as timer)',//结束签到
    check_sign_state:'select signing_state from sign_teacher where Class_No=? and teacher_time=(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer)',//签到状态
    select_ClassCourseMember2:' select c.Id id,a.Class_No Class_No,a.telphone telphone,b.User_Name User_Name,b.User_No User_No,b.User_Type User_Type,c.SignState SignState,c.teacher_time teacher_time from joinclass a,user b,sign_student c where a.Class_No=? and a.Class_No=c.Class_No and b.User_Telephone=c.telphone and  a.telphone=c.telphone and c.SignState!=? and c.teacher_time=(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer)',  //根据班课号查找这门课的缺席或正常的成员
    select_ClassNotSignMember:"SELECT * from (select a.Id id,a.Class_No Class_No,a.telphone telphone,b.User_Name User_Name,b.User_No User_No,b.User_Type User_Type,0 as SignState,c.teacher_time teacher_time from joinclass a,user b,sign_teacher c where a.Class_No=? and a.Class_No=c.Class_No   and b.User_Type=\"student\" and a.telphone=b.User_Telephone and c.teacher_time=(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer) )  as al where al.telphone not in (select telphone from (select c.Id id,a.Class_No Class_No,a.telphone telphone,b.User_Name User_Name,b.User_No User_No,b.User_Type User_Type,c.SignState SignState,c.teacher_time teacher_time from joinclass a,user b,sign_student c where a.Class_No=? and a.Class_No=c.Class_No and b.User_Telephone=c.telphone and  a.telphone=c.telphone and c.SignState!=0 and c.teacher_time=(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer)) as sign)",//未签到的成员
    sql_student_search:'select * from sign_student where telphone=? and Class_No=? and teacher_time=(SELECT maxTime from (select max(teacher_time) as maxTime from sign_teacher where Class_No =?) as timer)',
    sql_change_sign:'UPDATE sign_student set SignState=? WHERE telphone=? and Class_No=? and teacher_time=(SELECT maxTime from (select max(teacher_time) as maxTime from sign_teacher where Class_No =? ) as timer)',
    sql_sign_stu:'insert into sign_student(Class_No,telphone,SignState,student_time,teacher_time) values(?,?,?,(now()),(SELECT maxTime from (select max(teacher_time) as maxTime from sign_teacher where Class_No =?) as timer))',
    select_showSignDetail:'select date_format(student_time,\'%Y-%m-%d %H:%i:%s\') as time,SignState from sign_student where Class_No=? and telphone=?',    //显示学生对这门课的签到情况
    sql_time_signN:'SELECT date_format(a.teacher_time,\'%Y-%m-%d %H:%i:%S\') time,COUNT(DISTINCT b.telphone) signN from sign_teacher a LEFT JOIN sign_student b on a.Class_No=b.Class_No and a.teacher_time=b.teacher_time  where a.Class_No=? GROUP BY a.teacher_time',//签到记录
    sql_SignState:'select User_Name,User_No,SignState from user a,sign_student b where a.User_Telephone=b.telphone and b.Class_No=? and date_format(b.teacher_time,\'%Y-%m-%d %H:%i:%S\')=? UNION select User_Name,User_No,0 as SignState from user a where a.User_Type="student" and a.User_Telephone not in (select telphone from  sign_student b where  b.Class_No=? and date_format(b.teacher_time,\'%Y-%m-%d %H:%i:%S\')=?)',//签到记录详情


    //学生端
    sign_teacher:'select teacher_time from sign_teacher where Class_No=?  and teacher_time=(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer) and signing_state=1',
    signed_or_not:'select * from sign_student where teacher_time=(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer) and telphone=?',
    sign_update:'update sign_student set SignState=1 where telphone=? and teacher_time=(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer)',
    sign_stu:'insert into sign_student(Class_No,telphone,SignState,student_time,teacher_time) values(?,?,1,(now()),(SELECT maxTime from (select max(sign_teacher.teacher_time) as maxtime from sign_teacher where Class_No=?) as timer))',

    //////////////////web端//////////////////


};

module.exports = signSqlMap;