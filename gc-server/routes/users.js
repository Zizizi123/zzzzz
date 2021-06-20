var express = require('express');
var router = express.Router();
const axios = require('axios')
var qs = require('querystring')
var userDAO = require('../dao/userDAO');
var result = require('../model/result');
const SMSClient = require('@alicloud/sms-sdk')
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.send('err');
    } else {
        //  console.log(ret);
        res.send(ret);
    }
};




/////////////////////////////app端/////////////////////////////


//////////注册新增用户//////////
router.post('/users_info/regist', function (req, res) {
    console.log('post users called');
    var user = req.body;
    console.log(user);
    if (user.telphone) {
        userDAO.select_telphone(user, function (success) {
            console.log(success[0]);
            if (success[0] === undefined) {
                userDAO.add(user, function (success) {
                    if (success) {
                        var r = result.createResult(success, null);
                        return res.sendStatus(201);//用户信息增加成功
                        jsonWrite(res, r);
                    }
                })
            } else {
                return res.sendStatus(204); //当前注册手机号已经注册了
            }

        })
    }
});


const config = {
    client_id: 'a48f1774b2f9ce18125e',
    client_secret: '7529deef71dfcbd6de7a21150692ddbd64c31552'
}

// 登录接口
router.get('/github/login', function (req, res) {
    // 重定向到GitHub认证接口，并配置参数
    console.log("yesss")
    //let path = 'https://github.com/login/oauth/authorize?client_id=' + config.client_id
    // 转发到授权服务器
    res.redirect("https://github.com/login/oauth/authorize?client_id=a48f1774b2f9ce18125e")
})

// GitHub授权登录成功回调，地址必须与GitHub配置的回调地址一致
router.get('/github', async function (req, ress) {
    console.log('callback...')
    // 服务器认证成功，回调带回认证状态code
    const code = req.query.code
    console.log("code:", code)
    ress.redirect("http://localhost:8082/login?code=" + code)
})
router.get('/github/result', async function (req, ress) {
    console.log(req.query)
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: req.query.code
    }
    // 申请令牌token
    let res = await axios.post('https://github.com/login/oauth/access_token', params)
    console.log("token", res)
    const access_token = qs.parse(res.data).access_token
    console.log("token11", access_token)
    res = await axios.get('https://api.github.com/user', {
        headers: {
            accept: 'application/json',
            Authorization: 'token ' + access_token
        }
    }
    )
    console.log("-----------------------------------------", res.data)
    console.log("login--", res.data)
    //ress.sendStatus("2001")
    return ress.sendStatus(204)

})


//////////短信验证//////////
router.post('/sms', function (req, res) {
    console.log('post users called');
    var user = req.body;
    var code = "";
    for (let i = 0; i < 4; i++) {
        code += parseInt(Math.random() * 10);
    }
    if (user.mobile) {
        console.log("yess----")
        const accessKeyId = "LTAI4GENiorhFQnPiXULBAA4"//你的keyID
        const secretAccessKey = "OVfZDPoqgs5kqAxYXxwjq3I91xChZ0"//你的密钥
        let smsClient = new SMSClient({ accessKeyId, secretAccessKey })
        smsClient.sendSMS({
            PhoneNumbers: user.mobile,//必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为：国际区号+号码，如“85200000000”
            SignName: 'ABC商城',//必填:短信签名-可在短信控制台中找到
            TemplateCode: 'SMS_205616646',//必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
            TemplateParam: '{"code":' + code + '}'//可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
        }).then(function (msg) {
            let { Code } = msg
            console.log("msg", msg)
            if (Code === 'OK') {
                //处理返回参数
                res.send({
                    "code": code,
                    "state": 200
                });
            }
        }, function (err) {
            console.log("err", err)
        })
    }
});

//////////登陆时账号和密码验证//////////
router.post('/users_info/appLogin', function (req, res) {
    console.log("tessssssssssssssssssssssss")
    // console.log("window.location.href", window.location.href)
    // console.log('get appLogin called');
    var user = req.body;
    console.log("user", user);
    userDAO.select_telphone(user, function (success) {
        console.log(success[0]);
        if (success[0] !== undefined) {
            if ((user.role == success[0].User_Type) && (user.pass == success[0].User_Pass)) {
                //console.log("密码正确");
                return res.send('3');  //密码正确

            } else {
                //console.log("密码或者角色错误");
                console.log(user.role);
                console.log(user.pass);
                return res.send('2');//密码错误
            }
        } else {
            return res.sendStatus(204); //输入手机号错误
        }

    })


});




//////////忘记密码，重置密码//////////

router.put('/users_info/resetPass', function (req, res) {
    console.log('put resetPass called');
    var user = req.body;
    console.log(user);
    userDAO.select_telphone(user, function (success) {
        console.log(success[0]);
        if (success[0] !== undefined) {
            userDAO.change_pass(user, function (success) {
                var r = result.createResult(success, null);
                return res.sendStatus(201);//密码更新成功
                jsonWrite(res, r);
            })
        } else {
            return res.sendStatus(204); //手机号未注册,重置不了密码
        }
    })
});

//////////修改密码//////////
router.put('/users_info/changePass', function (req, res) {
    console.log('put changePass called');
    var user = req.body;
    console.log(user);
    userDAO.select_telphone(user, function (success) {
        console.log(success[0]);
        if (success[0] !== undefined && success[0].User_Pass == user.old_pass) {
            user.pass = user.new_pass;
            userDAO.change_pass(user, function (success) {
                var r = result.createResult(success, null);
                return res.sendStatus(201);//密码修改成功201
                jsonWrite(res, r);
            })
        } else {
            return res.sendStatus(204); //旧密码错误的时候返回204
        }
    })
});
//////////个人信息//////////
router.get('/users_info/appInfo', function (req, res) {
    console.log('get appInfo called');
    var user = req.query;
    console.log(user);
    userDAO.select_telphone(user, function (success) {
        // console.log(success[0]);
        jsonWrite(res, success);
    })
});
//////////保存个人信息//////////
router.put('/users_info/update_appInfo', function (req, res) {
    console.log('put update_appInfo called');
    var user = req.body;
    console.log(user);
    //先检查手机号
    userDAO.select_telphone(user, function (success) {
        console.log(success[0]);
        if (success[0] !== undefined) {
            userDAO.update_appInfo(user, function (success) {
                var r = result.createResult(success, null);
                return res.sendStatus(201);//保存个人信息成功
                jsonWrite(res, r);
            })
        } else {
            return res.sendStatus(204); //保存个人信息失败
        }
    })
});

//////////验证用户所对应的密码的正确性//////////
router.get('/users_info/verifyPass', function (req, res) {
    console.log('get verifyPass called');
    var user = req.query;
    console.log(user);
    //先检查手机号有没有被注册
    userDAO.select_telphone(user, function (success) {
        // console.log(success[0]);
        if (success[0] !== undefined) {
            userDAO.select_pass(user, function (success) {
                if (success[0] !== undefined) {
                    return res.sendStatus(201);//密码正确的时候返回201
                } else {
                    return res.sendStatus(204);//密码不正确的时候返回204
                }
            })
        }
    })
});

//////////更换手机号//////////
router.put('/users_info/changeTel', function (req, res) {
    console.log('put changeTel called');
    var user = req.body;
    console.log(user);
    //先检查手机号有没有被注册
    user.telphone = user.after_tel;
    userDAO.select_telphone(user, function (success) {
        console.log(success[0]);
        if (success[0] == undefined) {
            userDAO.update_telphone(user, function (success) {
                return res.sendStatus(201);//成功更换手机号返回201
            })
        } else {
            return res.sendStatus(204); //更换的手机号在数据库中有,返回204
        }
    })
});
//////////提交反馈//////////
router.post('/users_info/save_feedback', function (req, res) {
    console.log('post feedback called');
    var user = req.body;
    console.log(user);
    userDAO.add_feedback(user, function (success) {
        console.log(success);
        var r = result.createResult(success, null);
        return res.sendStatus(201);//反馈信息增加成功
        jsonWrite(res, r);

    })
});


module.exports = router;
