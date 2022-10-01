$(function () {
    //点击“去注册账号”的链接
    $("#link_to_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()

    })

    //点击“去登录”的链接
    $("#link_to_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })


    //从layui中获取 form 对象
    //从layui中获取 layer 对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //校验两次密码是否一致规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的值
            //还需要拿到密码框中的内容
            var pwd = $(".reg-box [name=password]").val()
            //然后进行一次等于的判断
            if (pwd !== value) {
                console.log(pwd);
                console.log(value);
                //如果判断失败，则return一个提示消息
                return "两次密码不一致！"
            }

        }
    })


    //监听注册表单的提交事件
    $("#form_reg").on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser',
            {
                username: $("#form_reg [name=username]").val(),
                password: $("#unbelivebable").val()
            },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功");
                $("#link_to_login").click()

            })
    })





    //监听登录表单的提交事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg("登录成功")
                //将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                // location.href = '/index.html'
            }
        })
    })



























})