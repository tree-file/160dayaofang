 $(function() {

     $(function() {
         $.ajax({
             type: 'get',
             url: 'http://localhost:1903/160/src/api/cart.php',
             dataType: 'json',
             success: function(str) {
                 // console.log(str.data2[0])
                 var html = str.data2.map(function(item) {
                     return `
                      <li class="good" data-id="${item.gid}">
                <p class="good_check" style="line-height:104px;"><input type="checkbox" name="good" value="{item.shu}" /></p>
                <p class="commodity" style="line-height:104px;">
                    <a href="#" class="wi63 hi63 fl"><img src="${item.src}" class="wi63 hi63"></a>
                    <a href="#" style="margin-left:15px;" class="fl"> ${item.title}</a>
                </p>
                <p class="good_price" style="line-height:104px;">￥&nbsp;${item.price}</p>
                <p class="good_discount" style="line-height:104px;">￥&nbsp;${item.price}</p>
                <p class="good_name" style="line-height:104px;">
                    <span class="cutnum">-</span>
                    <input class="nownum" data-num="99" type="text" value="${item.shu}" />
                    <span class="addnum">+</span>
                </p>
                <p class="good_total" style="line-height:104px;">￥&nbsp;${item.price*item.shu}</p>
                <p class="good_del" style="line-height:104px;">
                    <a href="javascript:;">X</a>
                </p>
            </li>
                    `
                 })
                 $('.good').html(html);
             }
         })
         init();
     })


     function init() {
         $('#cart').on('click', '.addnum', function() {
             var val = $(this).prev().val();
             var kucun = $(this).prev().data('val');
             val++;
             //上限：库存量
             if (val >= kucun) {
                 val = kucun;
             }
             var gid = $(this).parent().parent().data('id');
             console.log(gid)
             $(this).prev().val(val);
             total($(this));
             console.log(val);
             charu(val, gid);
         });

         $('#cart').on('click', '.cutnum', function() {
             var num = $(this).next().val();
             num--;
             var gid = $(this).parent().parent().data('id');

             //上限：库存量
             if (num <= 1) {
                 num = 1;
             }
             $(this).next().val(num);
             total($(this));
             charu(num, gid);
             // 
         });

         //手动输入改变数量
         $('#cart').on('input', '.nownum', function() {
             var num = $(this).val();
             var kuncun = $(this).data('num');
             if (num <= 1) {
                 num = 1;
             } else if (num >= kuncun) {
                 num = kuncun;
             }
             $(this).val(num);
             total($(this));
         });

         //小计
         function total(now) {
             //找数量
             var num = $(now).parent().find('.nownum').val();
             //找单价
             var price = $(now).parent().prev().text().slice(2);
             //小计=数量 * 单价
             var xiaoji = (num * price).toFixed(2);
             //      console.log(num,price,xiaoji);
             $(now).parent().next().html('￥ ' + xiaoji);
             all();

         }

         //删除当行
         $('#cart').on('click', '.good_del', function() {
             //      console.log(888);
             var res = confirm('您确定要删除吗？');
             if (res) {
                 $(this).parent().remove();
             }
             var gid = $(this).parent().data('id');
             console.log(gid)
             $.ajax({
                 type: 'get',
                 url: '../api/cart.php',
                 data: {
                     'rem': gid,

                 },
                 success: function() {}
             })
             update();
         });

         //是否应该保留最后一行：如果没有商品了，就隐藏这行(算总价和总数量的)
         function update() {
             var len = $('#cart .addnum').size();
             if (len == 0) {
                 //没有商品了
                 $('#del').hide();
             }
         }

         //全选
         $('#allchecked input').click(function() {
             var isok = $('#allchecked input').prop('checked');
             $('.good_check input').prop('checked', isok);
             all();

         });

         //计算总数量和总价格
         var arr = [];

         function all() {

             $('.good_check input').each(function(i, item) {
                 if ($(item).prop('checked')) {
                     //这一行被勾选，把的下标存到数组里面
                     arr.push(i);

                 }
             });
             //      console.log(arr);

             //求总数量
             var num = 0;
             var price = 0;
             arr.forEach(function(item) { //0 1 
                 num += $('.nownum').eq(item).val() * 1;
                 price += $('.good_total').eq(item).text().slice(2) * 1;
             });

             //      console.log(num,price.toFixed(2));

             //渲染
             $('#allnum').html('已选 ' + num + ' 件商品');
             $('#totalprice').html('总计（不含运费）：￥' + price.toFixed(2));
             arr = []; //数组用完就清空
         }

         //点击复选框控制全选
         $('#cart').on('click', '.good_check input', function() {
             var len = $('.good_check input:checked').size();
             var total = $('.good_check input').size();
             if (len == total) {
                 //证明全部勾选了
                 $('#allchecked input').prop('checked', true);
             } else {
                 $('#allchecked input').prop('checked', false);
             }
             all(); //刷新总数量和总价格
         });

         //全删
         $('#delall').click(function() {
             $('.good_check input').each(function(i, item) {
                 if ($(this).prop('checked')) {
                     //这一行被勾选，把的下标存到数组里面
                     console.log()
                     console.log($('input:checkbox[name="good"]').size())
                     if ($('input:checkbox[name="good"]').size() == 1) {
                         var res = confirm('您确定要全删吗？');
                         $(this).parents('#cart').next().remove();
                     };
                     $(this).parents('.good').remove();
                 }
             });


             //删掉多行
             // 
             // if (res) {
             //     for (var i = newarr.length - 1; i >= 0; i--) {
             //         $('.goods').eq(newarr[i]).remove();
             //     }

             //     //刷新价格
             //     all();
             //     update();
             // }

         });
         if (getCookie('phone')) {
             $('.list-l').eq(0).find('span').html(getCookie('phone'));
             $('.list-i').html('退出').addClass('tui');
         } else {
             $('.list-l').eq(0).find('span').html('Hi，请登录');
             $('.list-i').html('欢迎注册');
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
     }

     function charu(val, id) {
         $.ajax({
             type: 'get',
             url: '../api/cart.php',
             data: {
                 'val': val,
                 'goodsid': id,

             },
             success: function() {}
         })
     }
 });