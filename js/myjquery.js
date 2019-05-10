/* 
 * @Author: Marte
 * @Date:   2019-05-09 17:06:13
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-09 17:07:59
 */

function startmove(obj, json, fnend) {

    //开启之前需要关闭定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {

        var isStop = true;

        //通过函数getStyle获取初始值： 初始值-目标值；speed
        for (var attr in json) {
            var cur = 0; //存初始值
            //透明度把数值取出来，用来比较   透明度：0.2 0
            if (attr == 'opacity') {
                console.log(getStyle(obj, attr));
                cur = parseFloat(getStyle(obj, attr)) * 100;
            } else {
                cur = parseInt(getStyle(obj, attr))
            }

            //speed的大小：缓冲运动，和距离有关
            var speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            //准备一个开关，如果上一个状态未到达目标值，下面还不能开启新的定时器
            if (cur != json[attr]) {
                //如果没有达到目标值
                isStop = false;
            } else {
                isStop = true;
            }

            //根据目标值，设置运动
            if (attr == 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if (isStop) {
            clearInterval(obj.timer);
            if (fnend) {
                fnend();
            }
        }

    }, 30);
}