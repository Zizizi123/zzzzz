var classCourseSqlMap = {

    //////////////////app端//////////////////


    //老师端
    add_course: 'insert into course(Id,Course_Name,School,Institute,Course_Term,Course_Week,Course_Require,Course_proceed,Course_Exam,isCreating) values (0,?,?,?,?,?,?,?,?,?)',//将课程信息插入到数据库中
    add_class: 'insert into class(Id,Course_Id,Class_No,Class_Name,Class_Place,Teacher_Id,Teacher_Name,Createdate) values (0,?,?,?,?,?,?,now())',//将班级信息插入到数据库中
    select_ClassNo: 'select * from class where Class_No = ?',    //搜索班课号
    select_AllClassCourse: 'select a.Course_Name,a.Course_Term,b.Class_No,b.Class_Name,b.Teacher_Name from course a left outer join class b on a.Id=b.Course_Id',   //所有班课
    select_MyClassCourse: 'select a.Course_Name,a.Course_Term,b.Class_No,b.Class_Name,b.Teacher_Name from course a left outer join class b on a.Id=b.Course_Id where b.Teacher_Id= ?', //我创建的班课
    update_ClassCourse: 'update course a left join class b on a.Id=b.Course_Id set Course_Name=?,School=?,Course_Term=?,Course_Week=?,Course_Require=?,Course_proceed=?,Course_Exam=?,Class_Name=?,Class_Place=?,Teacher_Name=? where Class_No=?',//更新班课
    select_ClassCourseDetail: 'select * from course a left outer join class b on a.Id=b.Course_Id where b.Class_No= ?', //根据班课号查看班课信息
    select_teacherCourseMember: 'SELECT User_Name,User_No,User_Telephone from user where User_Telephone in (SELECT telphone from joinclass where Class_No=?)',//显示课程成员
    //学生端
    select_MyJoinClassCourse: 'select * from class a left outer join joinclass b  on b.Class_No=a.Class_No RIGHT OUTER JOIN course c on a.Course_Id=c.Id where b.telphone= ?',//我加入的班课及其班课的信息
    select_joinClass: 'select * from joinClass where Class_No= ?', //判断学生加入的班课是否唯一
    join_classCourse: 'insert into joinClass(Id,Class_No,telphone,Createdate) values (0,?,?,now())',//学生加入班课
    delete_classCourse: 'delete from joinclass where Class_No=? and telphone=?',//学生退出班课
    select_ClassCourseMember: 'select * from joinclass a left outer join user b on a.telphone=b.User_Telephone where a.Class_No= ?',//显示课程成员


    //////////////////web端//////////////////

};

module.exports = classCourseSqlMap;