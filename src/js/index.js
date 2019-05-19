/* 
 * @Author: Marte
 * @Date:   2019-05-20 00:44:08
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-20 01:12:12
 */
$(function() {
    var side = document.getElementById('side');
    var header = document.getElementsByClassName('header');
    var scrollTop = window.scrollY;
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
    $('.nav-item').click(function() {
        location.href = "html/list.html";
    })
    $('.nav-list-warpper li,.menu-sub').hover(function() {
            $('.menu-sub').show().stop().animate({ 'left': 188 }, 300);
        },
        function() {
            /* Stuff to do when the mouse leaves the element */
            $('.menu-sub').hide().stop().animate({ 'left': 180 }, 300);
        });
    window.onscroll = function() {
        var scrollTop = window.scrollY;
        var iw = 120;
        if (scrollTop >= iw) {
            side.className = 'fix';
        } else {
            side.className = '';
        }
    }
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // loop: true,
    });
});