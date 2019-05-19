/* 
 * @Author: Marte
 * @Date:   2019-05-15 21:08:37
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-20 01:19:25
 */

$(function() {
    var $data = decodeURI(location.search);
    var $str = $data.slice(1);
    $.ajax({
        type: 'get',
        url: "../api/goods.php",
        data: { 'gid': $str },
        dataType: 'json',
        success: function(str) {
            var html = `
                                <li class="small-pic-li">
                                    <a>
                                        <img src="${str[0].src}" alt="感冒灵颗粒 13.00">
                                        <i></i>
                                    </a>
                                </li>
                                <li class="small-pic-li">
                                    <a>
                                        <img src="${str[0].small}" alt="感冒灵颗粒 13.00">
                                        <i></i>
                                    </a>
                                </li>
            `;
            $('.small-pic').html(html);
            $('#zoomimg').attr('src', str[0].src);
            $('.breadcrumb em,.superboler em').html(str[0].title);
            $('.product-info-title i').html(str[0].adapt);
            $('#market_price').html(str[0].prix);
            $('#goods_price').html(str[0].price);
            $('.nett .fn-rmb1').html(str[0].common);
            $('.nett .fn-rmb2').html(str[0].reference);
            $('.nett .fn-rmb3').html(str[0].yield);
        }
    })
    if (getCookie('phone')) {
        $('.list-l').eq(0).find('span').html(getCookie('phone'));
        $('.list-i').html('退出').addClass('tui');
        $('.container-right').click(function() {
            location.href = "html/car.html";
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
            location.href = "html/login.html";
        })
        $('.list-l').eq(1).click(function() {
            location.href = "html/reg.html";
        })
    }
});