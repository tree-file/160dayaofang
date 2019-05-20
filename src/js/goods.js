/* 
 * @Author: Marte
 * @Date:   2019-05-15 21:08:37
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-20 16:57:43
 */

$(function() {
    var data = decodeURI(location.search);
    var str = data.slice(1);
    console.log(str);
    $.ajax({
        type: 'get',
        url: "../api/goods.php",
        data: { 'gid': str },
        // dataType: 'json',
        success: function(str) {
            var arrObj = JSON.parse(str);
            console.log(arrObj);
            var html = `
                                <li class="small-pic-li">
                                    <a>
                                        <img src="${arrObj[0].src}" alt="感冒灵颗粒 13.00">
                                        <i></i>
                                    </a>
                                </li>
                                <li class="small-pic-li">
                                    <a>
                                        <img src="${arrObj[0].small}" alt="感冒灵颗粒 13.00">
                                        <i></i>
                                    </a>
                                </li>
            `;
            $('.small-pic').html(html);
            $('#zoomimg').attr('src', arrObj[0].src);
            $('.breadcrumb em,.superboler em').html(arrObj[0].title);
            $('.product-info-title i').html(arrObj[0].adapt);
            $('#market_price').html(arrObj[0].prix);
            $('#goods_price').html(arrObj[0].price);
            $('.nett .fn-rmb1').html(arrObj[0].common);
            $('.nett .fn-rmb2').html(arrObj[0].reference);
            $('.nett .fn-rmb3').html(arrObj[0].yield);
            $('.small-pic li').hover(function() {
                /* Stuff to do when the mouse enters the element */
                var src = $(this).find('img').attr('src');
                $('#zoomimg').attr('src', src);
            }, function() {
                /* Stuff to do when the mouse leaves the element */
            });
        }
    })
    if (getCookie('phone')) {
        $('.list-l').eq(0).find('span').html(getCookie('phone'));
        $('.list-i').html('退出').addClass('tui');
        $('.container-right').click(function() {
            location.href = "../html/car.html";
        })
        $('.btn1').click(function() {
            alert('已加入购物车');
            var $pone = getCookie('phone');
            var $gid = $(this).attr('data-id');
            var $num = $('#amount').val();
            $.ajax({
                type: 'get',
                url: '../api/cart.php',
                data: { 'gid': $gid, 'num': $num },
                dataType: 'json',
                success: function(str) {

                }
            })
        })
    } else {
        $('.list-l').eq(0).find('span').html('Hi，请登录');
        $('.list-i').html('欢迎注册');
        $('.container-right').click(function() {
            alert('请登录, 查看购物车');
        })
        $('.btn1').click(function() {
            alert('请登录, 购买');
        })
    }
    if ($('.list-i').hasClass('tui')) {
        $('.list-i').click(function() {
            removeCookie('phone');
        })
    } else {
        $('.list-l').eq(0).find('span').click(function() {
            location.href = "../html/login.html";
        })
        $('.list-l').eq(1).click(function() {
            location.href = "../html/reg.html";
        })
    }
});