/* 
 * @Author: Marte
 * @Date:   2019-05-14 11:41:32
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-19 23:49:03
 */

$(function() {
    $('#_loginBtn').on('click', function() {
        var $val = $('#username').val();
        var $val1 = $('#password').val();
        if ($val) {
            if ($val1) {
                $.ajax({
                    type: 'post',
                    url: '../api/login.php',
                    data: { 'phone': $val, 'psw': $val1 },
                    success: function(str) {
                        console.log(str);
                        console.log($val, $val1);
                        if (str == '1') {
                            setCookie('phone', $val, 7);
                            console.log($val)
                            location.href = "../indxe.html";
                        } else {
                            alert('用户名或密码不正确');
                            // $('.form_div_none').show();
                        }
                    }
                })
            } else {
                alert('内容不能为空');
            }

        } else {
            alert('内容不能为空');
        }
    })
    $('.reg').on('click', function() {
        location.href = "http://localhost:1903/160/src/html/reg.html";
    })
});