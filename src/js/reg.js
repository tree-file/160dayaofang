/* 
 * @Author: Marte
 * @Date:   2019-05-14 09:37:36
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-20 19:46:54
 */
$(function() {
    var $arr = [];
    var tell1 = 0;
    var rdc = 0;
    var psw = '';
    $("#_phone").blur(function() {
        tell1 = $("#_phone").val();
        var aa = /^1\d{10}$/;
        if (tell1 == null || tell1 == "") {
            $("#phone_msg").html("不能为空");
            $arr[$(this).parents('.list').index()] = 1;
        } else if (!aa.test(tell1) || tell1.length != 11) {
            $("#phone_msg").html("" + "必须是纯数字11位1开头");
            $arr[$(this).parents('.list').index()] = 1;
        } else {
            // $("#phone_msg").html("验证成功").css('color', 'green');
            $("#phone_msg").html("");
            $arr[$(this).parents('.list').index()] = 0;
        }
    })
    $("#_password").blur(function() {
        psw = $("#_password").val();
        var patrm1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (psw == null || psw == "") {
            $("#psw_msg").html("不能为空");
            $arr[$(this).parent().index()] = 1;
        } else if (!patrm1.test(psw)) {
            $("#psw_msg").html("密码规则为输入包含数字和字母的6-20位密码");
            $arr[$(this).parents('.list').index()] = 1;
        } else {
            $("#psw_msg").html("");
            $arr[$(this).parents('.list').index()] = 0;
        }
    })
    $("#_surepassword").blur(function() {
        var psw2 = $("#_surepassword").val();
        var psw1 = $("#_password").val();

        if (psw2 == null || psw2 == "") {
            $("#_surepassword_msg").html("不能为空");
            $arr[$(this).parents('.list').index()] = 1;

        } else if (psw2 != psw1) {
            $("#_surepassword_msg").html("两次密码不相同");
            $arr[$(this).parents('.list').index()] = 1;
        } else {
            $("#_surepassword_msg").html("");
            $arr[$(this).parent().index()] = 0;
        }
    })
    $("#code_duan").blur(function() {
        var duan = $("#code_duan").val();
        if (duan == null || duan == "") {
            $("#duan_msg").html("验证码不能为空");
            $arr[$(this).parents('.list').index()] = 1;

        } else if (duan != rdc) {
            $("#duan_msg").html("验证码错误");
            $arr[$(this).parents('.list').index()] = 1;
        } else {
            $("#duan_msg").html("验证码正确");
            $arr[$(this).parent().index()] = 0;
        }
    })
    $(function() {
        var verifyCode = new GVerify("v_container");
        document.getElementById("my_button").onclick = function() {
            var res = verifyCode.validate(document.getElementById("code_input").value);
            if (res) {
                $('#code_msg').html("验证码正确");
                $arr[$(this).parents('.list').index()] = 0;
                rdc = randomCode();
                console.log(rdc);
                $.ajax({
                    url: '../api/phone.php',
                    type: 'get',
                    data: {
                        'phone': tell1,
                        'code': rdc,
                    },
                })
            } else {
                $('#code_msg').html("验证码错误");
                $arr[$(this).parents('.list').index()] = 1;
            }
        }
        $('#v_container').click(function() {
            $('#code_msg').html("");
            $arr[$(this).parents('.list').index()] = 0;
        });
    })
    $('.btn').click(function() {
        console.log($arr);
        var isok = false;
        $.each($arr, function(index, val) {
            if (val == 1) {
                $('.list').eq(index).find('.wrong').html('这里需要完善');
                return isok = false;
            } else {
                isok = true;
                location.href = "http://localhost:1903/160/src/html/login.html";
            }
        });
        if (isok) {
            $.ajax({
                type: "post",
                url: "../api/my_button.php",
                async: true,
                data: {
                    'phone': tell1,
                    'psw': psw,
                },
                success: function(str) {

                }
            });
        }
    });
});