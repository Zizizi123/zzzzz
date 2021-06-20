var express = require('express');
var router = express.Router();
var signDAO = require('../dao/signDAO');
var result = require('../model/result');
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        //  console.log(ret);
        res.send(ret);
    }
};




/////////////////////////////app端/////////////////////////////


///////////////老师端////////////////

//////////获得签到状态//////////

router.get('/sign/getSignState', function (req, res) {
    console.log('get getSignState called');
    var sign = req.query;
    console.log(sign);
    signDAO.get_signState(sign,function (success) {
        if(success[0]==undefined){
            return res.sendStatus(204);//班课还未发起签到，找不到状态
        }else{
            return res.send(success[0]);
        }
    })
});

//////////发起签到//////////
router.get('/sign/SignIn_start', function (req, res) {
    console.log('get SignIn_start called');
    var sign = req.query;
    console.log(sign);
    signDAO.sign_start(sign,function (success) {
        signDAO.select_teacherTime(sign,function (success) {
            jsonWrite(res,success);
        })
    })
});

//////////结束签到//////////
router.put('/sign/SignIn_end', function (req, res) {
    console.log('put SignIn_end called');
    var sign = req.body;
    console.log(sign);
    signDAO.sign_end(sign, function (success) {
        return res.sendStatus(201);//成功结束签到
    })
});


//////////根据班课号查找班课所有成员，分成签到和为签到 //////////

router.get('/sign/showMember', function (req, res) {
    console.log('get showMember called');
    var sign = req.query;
    var Member={signed:'',unsigned:''};
    console.log(sign);
    signDAO.check_sign_state(sign,function (success) {
        if(success[0]!=undefined&&success[0].signing_state!=undefined){
            if(success[0].signing_state!=0){
                signDAO.select_ClassCourseMember2(sign, function (success) {
                    Member.signed=success;
                    signDAO.select_ClassNotSignMember(sign, function (success) {
                        Member.unsigned=success;
                        jsonWrite(res, Member);
                    })
                })
            }
        }
    })
});



//////////改变学生状态//////////
router.post('/sign/ChangeStatus', function (req, res) {
    console.log('post ChangeStatus called');
    var sign = req.body;
    var Member={signed:'',unsigned:''};
    console.log(sign);
    signDAO.sql_student_search(sign,function (success) {
        if(success[0]!=undefined){
            signDAO.sql_change_sign(sign,function (success) {

            });
            signDAO.select_ClassCourseMember2(sign,function (success) {
                Member.signed = success;
                signDAO.select_ClassNotSignMember(sign,function (success) {
                    Member.unsigned = success;
                    return jsonWrite(res, Member);
                });
            });

        }else{
            signDAO.sql_sign_stu(sign,function (success) {

            });
            signDAO.select_ClassCourseMember2(sign,function (success) {
                Member.signed = success;
                signDAO.select_ClassNotSignMember(sign,function (success) {
                    Member.unsigned = success;
                    return jsonWrite(res, Member);
                });
            });
        }
    });
});

//////////显示所有该成员这门课的所有签到记录//////////
router.get('/sign/showSignDetail', function (req, res) {
    console.log('get showSignDetail called');
    var sign = req.query;
    console.log(sign);
    signDAO.select_showSignDetail(sign,function (success) {
        jsonWrite(res,success);//这门课学生参与签到的情况
    })
});

//////////签到记录//////////
router.get('/sign/SignRecord', function (req, res) {
    console.log('get SignRecord called');
    var sign = req.query;
    console.log(sign);
    signDAO.sql_time_signN(sign,function (success) {
        jsonWrite(res,success);//签到的情况
    })
});

//////////显示某次签到的全部记录//////////
router.get('/sign/GetSpecificTimeRecord', function (req, res) {
    console.log('get GetSpecificTimeRecord called');
    var sign = req.query;
    console.log(sign);
    signDAO.sql_SignState(sign,function (success) {
        jsonWrite(res,success);//签到的情况
    })
});




///////////////学生端////////////////
router.post('/sign/SignIn', function (req, res) {
    console.log('post SignIn called');
    var sign = req.body;
    console.log(sign);
    signDAO.sign_teacher(sign,function (success) {
        if(success[0]!=undefined){
            signDAO.signed_or_not(sign,function (success) {
                if(success[0]!=undefined) {
                    if(success[0].SignState==1){
                        return res.sendStatus(201);//已经签到过
                    }else{
                        signDAO.sign_update(sign,function (success) {
                            return res.sendStatus(200);//签到成功
                        })
                    }
                }else{
                    signDAO.sign_stu(sign,function (success) {
                        return res.sendStatus(200);//签到成功
                    })
                }

            });
        }else{
            return res.sendStatus(204);//老师未发起签到
        }
    });
});


module.exports = router;
