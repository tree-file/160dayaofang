/* 
 * @Author: Marte
 * @Date:   2019-05-20 00:55:58
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-20 09:12:53
 */

$(function() {

    var cata_choose_product = getid('cata_choose_product');
    var $page = 1;
    var $type = 'id';
    var price = getid('price');
    var $order = 'ASC';


    function ajax333(page, isok) {
        $.ajax({
            url: "http://localhost:1903/160/src/api/orderby.php",
            type: "get",
            data: {
                'page': page,
                'type': $type,
                'order': isok,
            },
            success: function(str) {
                create(str);
            }
        });

    }
    ajax333($page, 'ASC');

    function create(str) {
        var arr = JSON.parse(str);
        var res = arr.goodslist.map(function(item) {
            return `<li data-id="${item.id}">
                    <div class="nosinglemore"></div>
                    <div class="listbox clearfix">
                        <div class="listPic">
                            <a rel="nofollow" href="#">
                                <img src="${item.src}" class="fn_img_lazy" title="${item.title}" alt="${item.title}">
                            </a>
                        </div>
                        <div class="list-scroll">
                            <div class="list-scroll-warp">
                                <dl class="clearfix">
                                    <dd class="">
                                        <a href="#">
                                            <img src="${item.small}" />
                                        </a>
                                    </dd>
                                    <dd class="">
                                        <a href="#">
                                            <img src="${item.small}" />
                                        </a>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div class="discountPrice">
                            <div class="price-cash">
                                <span class="text13">¥</span>
                                <span class="text18">${item.price}</span>
                                <del></del>
                            </div>
                        </div>
                        <div class="listDescript">
                            <a href="#" class="text13">${item.title}</a>
                        </div>
                        <div class="itemPrice">
                            <div class="bobs"> <span class="text12">${item.pharmacy}</span></div>
                            <div class="cart_wrapper"> <span class="text12">已售&nbsp;&nbsp;<i>${item.sold}</i></span></div>
                        </div>
                    </div>
                </li>`;
        }).join('');
        cata_choose_product.innerHTML = res;
        $('#cata_choose_product li').on('click', function() {
            var val = $(this).attr('data-id');
            console.log(13);
            location.href = "../html/goods.html?" + val;
        });
        $(window).load(function() {
            /* Act on the event */
            $("#page").paging({
                pageNum: 1, // 当前页面
                totalNum: Math.ceil(arr.total / 12), // 总页码
                totalList: arr.total, // 记录总数量
                callback: function(num) { //回调函数
                    ajax333(num, $order);
                }
            });
        });
    }
    var $order = 'ASC';
    var isok = true;
    price.onclick = function() {
        if (isok) {
            $order = 'ASC';
        } else {
            $order = 'DESC';
        }
        isok = !isok;
        $type = 'price';
        ajax333(1, $order);
    }
    if (getCookie('phone')) {
        $('.list-l').eq(0).find('span').html(getCookie('phone'));
        $('.list-i').html('退出').addClass('tui');
        $('.container-right').click(function() {
            location.href = "../html/car.html";
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
            location.href = "../login.html";
        })
        $('.list-l').eq(1).click(function() {
            location.href = "../html/reg.html";
        })
    }
});