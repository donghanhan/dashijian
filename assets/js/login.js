$("#login_box").on("click",function(){
    $(".login_box").hide();
    $(".reg_box").show();
})
$("#reg_box").on("click",function(){
    $(".login_box").show()
    $(".reg_box").hide()
})
// 设置密码输入限制
var form =layui.form
var layer =layui.layer
form.verify({
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    rpwd:function(value){
        var pwd =$(".reg_box [name=password]").val()
        if(pwd!==value){
            return "两次密码输入不一样"
        }
    }
})
// 监听注册表单
$("#reg-box").submit(function(e){
    e.preventDefault()
    $.post("/api/reguser",{username:$("#reg-box [name=username]").val(),password:$("#reg-box [name=password]").val()},function(res){
        if(res.status !==0){
          return  layer.msg(res.message);
        }
        layer.msg(res.message+"请登录");
        setTimeout(function(){
            $("#reg_box").click();
            $('.layui-input').val('')
        },1000)
    })
})
// 表单登陆
$("#login-box").on("submit",function(e){
    e.preventDefault();
    $.ajax({
        method:'post',
        url:'/api/login',
        data:$(this).serialize(),
        success : function(res){
            if(res.status !==0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            localStorage.setItem("token",res.token)
            location.href='/index.html'
            $('.layui-input').val('')
        }
    })
})