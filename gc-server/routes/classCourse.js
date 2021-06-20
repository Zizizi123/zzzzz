var express = require('express');
var router = express.Router();
var classCourseDAO = require('../dao/classCourseDAO');
var result = require('../model/result');
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.send('err');
    } else {
        //  console.log(ret);
        res.send(ret);
    }
};




/////////////////////////////app端/////////////////////////////


///////////////老师端////////////////

//////////创建班课//////////
router.post('/classCourse/createClassCourse', function (req, res) {
    console.log('post createClassCourse called');
    var classCourse = req.body;
    console.log("classCourse:---------", classCourse);
    classCourseDAO.select_ClassNo(classCourse, function (success) {  //先验证随机生成的班课号是否唯一
        console.log(success[0]);
        if (success[0] == undefined) {
            classCourseDAO.add_course(classCourse, function (success) {
                console.log(success);
                classCourse.insertId = success.insertId;
                classCourseDAO.add_class(classCourse, function (success) {
                    console.log(success);
                    if (success) {
                        var r = result.createResult(success, null);
                        return res.sendStatus(201);//成功创建班课
                        jsonWrite(res, r);
                    }
                });
            });
        } else {
            return res.sendStatus(204);//班课号重复
        }
    });
});



//////////老师_所有班课//////////
router.get('/classCourse/allClassCourse', function (req, res) {
    console.log('get allClassCourse called');
    classCourseDAO.select_AllClassCourse(function (success) {
        jsonWrite(res, success);
    })
});

//////////老师_我创建的班课//////////
router.get('/classCourse/myClassCourse', function (req, res) {
    console.log('get myClassCourse called');
    var classCourse = req.query;
    console.log("teacher-!!!!!!!!!", classCourse);
    classCourseDAO.select_MyClassCourse(classCourse, function (success) {
        jsonWrite(res, success);
    })
});

//////////老师修改班课//////////

router.put('/classCourse/editClassCourse', function (req, res) {
    console.log('put editClassCourse called');
    var classCourse = req.body;
    console.log(classCourse);
    classCourseDAO.update_ClassCourse(classCourse, function (success) {
        return res.sendStatus(201);//修改班课成功
    })
});

//////////根据班课号查找班课//////////
router.get('/classCourse/ClassNoClassCourse', function (req, res) {
    console.log('get ClassNoClassCourse called');
    var classCourse = req.query;
    classCourse.banKeCode = classCourse.NOClass;
    console.log(classCourse);
    classCourseDAO.select_ClassNo(classCourse, function (success) {      //判断班课是否存在
        if (success[0] == undefined) {
            return res.sendStatus(204);//班课号不存在
        } else {
            classCourseDAO.select_ClassCourseDetail(classCourse, function (success) {
                jsonWrite(res, success);
            })
        }
    })
});

//////////老师_显示课程的成员//////////

router.get('/classCourse/TeacherCourseMember', function (req, res) {
    console.log('get TeacherCourseMember called');
    var classCourse = req.query;
    console.log(classCourse);
    classCourseDAO.select_teacherCourseMember(classCourse, function (success) {
        jsonWrite(res, success);
    })
});








///////////////学生端////////////////

////////学生_我加入的班课////////

router.get('/classCourse/myJoinClassCourse', function (req, res) {
    console.log('get myJoinClassCourse called');
    var classCourse = req.query;
    console.log(classCourse);
    classCourseDAO.select_MyJoinClassCourse(classCourse, function (success) {      //判断班课是否存在
        jsonWrite(res, success);
    })
});

//////////查找班课号//////////

router.post('/classCourse/inputClassNo', function (req, res) {
    console.log('post inputClassNo called');
    var classCourse = req.body;
    classCourse.banKeCode = classCourse.NOClass;
    console.log("输入班课", classCourse);
    classCourseDAO.select_ClassNo(classCourse, function (success) {    //判断班课是否存在
        if (success[0] == undefined) {
            return res.sendStatus(204);//班课号不存在，不让加入班课
        } else {
            return res.sendStatus(201);//班课号存在
        }
    });
});

//////////学生加入班课//////////
router.post('/classCourse/joinClassCourse', function (req, res) {
    console.log('post joinClassCourse called');
    var classCourse = req.body;
    classCourse.banKeCode = classCourse.NOClass;
    console.log(classCourse);
    classCourseDAO.select_ClassNo(classCourse, function (success) {  //先验证随机生成的班课号是否唯一
        if (success[0] == undefined) {
            return res.sendStatus(204);//班课号不存在，不让加入班课
        } else {
            classCourseDAO.select_joinClass(classCourse, function (success) {
                if (success[0] == undefined) {//如果joinClass表中，班课号不存在，则加入
                    classCourseDAO.join_classCourse(classCourse, function (success) {
                        return res.sendStatus(200);//成功加入班课
                    });

                } else {//如果joinClass表中，班课号存在，则需要判断学生是否重复添加
                    for (var i = 0; i < success.length; i++) {
                        if (success[i].telphone == classCourse.telphone) {
                            return res.send(201);//一个学生不能加入同一门课
                        }
                    }
                    classCourseDAO.join_classCourse(classCourse, function (success) {
                        return res.sendStatus(200);//成功加入班课
                    });
                }

            });
        }
    });
});
//////////学生_退出班课//////////

router.delete('/classCourse/outClassCourse', function (req, res) {
    console.log('post outClassCourse called');
    var classCourse = req.body;
    console.log(classCourse);
    classCourseDAO.delete_classCourse(classCourse, function (success) {
        return res.sendStatus(201);//退出班课成功
    });
});


//////////学生_显示课程的成员//////////

router.get('/classCourse/StudentCourseMember', function (req, res) {
    console.log('get StudentCourseMember called');
    var classCourse = req.query;
    console.log(classCourse);
    classCourseDAO.select_ClassCourseMember(classCourse, function (success) {
        jsonWrite(res, success);
    })
});


module.exports = router;
