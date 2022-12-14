//注意：每次调用$.get()/$.post()或$.ajax()时，会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options);   //{url: '/api/login', type: 'POST', isLocal: false, global: true, processData: true, …}
    console.log(options.url);  //   /api/login

    //在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = "http://www.liulongbin.top:3007" + options.url
    console.log(options.url);  //http://www.liulongbin.top:3007/api/login

    //统一为有权限的接口，设置headers请求头
    //如果url里面有/my/这个路径，我们给他headers请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页
            location.href = '/login.html'
        }
    }

})