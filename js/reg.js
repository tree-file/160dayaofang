/* 
 * @Author: Marte
 * @Date:   2019-05-14 09:37:36
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-14 17:46:53
 */

$(function() {

    $("#_phone").blur(function() {
        var tell1 = $("#_phone").val();
        var aa = /^1\d{10}$/;
        if (tell1 == null || tell1 == "") {
            $("#phone_msg").html("不能为空");
        } else if (!aa.test(tell1) || tell1.length != 11) {
            $("#phone_msg").html("" + "必须是纯数字11位1开头");
        } else {
            // $("#phone_msg").html("验证成功").css('color', 'green');
            $("#phone_msg").html("");
        }
    })
    $("#_password").blur(function() {
        var psw = $("#_password").val();
        var patrm1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (psw == null || psw == "") {
            $("#psw_msg").html("不能为空");
        } else if (!patrm1.test(psw)) {
            $("#psw_msg").html("密码规则为输入包含数字和字母的6-20位密码");
        } else {
            $("#psw_msg").html("");

        }
    })
    $("#_surepassword").blur(function() {
        var psw2 = $("#_surepassword").val();
        var psw1 = $("#_password").val();

        if (psw2 == null || psw2 == "") {
            $("#_surepassword_msg").html("不能为空");
        } else if (psw2 != psw1) {
            $("#_surepassword_msg").html("两次密码不相同");
            flas2 = false;
            return
        } else {
            $("#_surepassword_msg").html("");
        }
    })
});