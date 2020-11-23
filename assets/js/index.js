$(function(){
    gitUserInfo()
})

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
        }
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