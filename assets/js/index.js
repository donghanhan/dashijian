$(function(){
    gitUserInfo()

    var layer =layui.layer

    $('#toover').on('click',function(){
        layer.confirm('确定退出登陆?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          })
    })
})
//获取用户基本信息
function gitUserInfo() {
    $.ajax({
        type: 'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization:localStorage.getItem("token")||""
        // },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
        // complete:  function(res){
        // if(res.responseJSON.status === 1&&res.responseJSON.message === '身份认证失败！'){
        //     localStorage.removeItem('token')
        //     location.href='login.html'
        // }
        // }
    })
}
function renderAvatar(user){
    let name = user.username || user.nickname
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        let im = name[0].toUpperCase()
        $('.text-avatar').html(im).show()  
    }
}