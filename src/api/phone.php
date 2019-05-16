<?php
/**
 * @Author: Marte
 * @Date:   2019-05-16 22:28:08
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-16 23:02:24
 */
$code = isset($_GET['code'])?$_GET['code']:'';
$phone =  isset($_GET['phone'])?$_GET['phone']:'';
$url = "http://v.juhe.cn/sms/send";
$params = array(
    'key'   => '549d256bd5b316aa996b3beda87ae0a5', //您申请的APPKEY
    'mobile'    => '$phone', //接受短信的用户手机号码
    'tpl_id'    => '', //您申请的短信模板ID，根据实际情况修改
    'tpl_value' =>'#code#='.$code //您设置的模板变量，根据实际情况修改
);

$paramstring = http_build_query($params);
$content = juheCurl($url, $paramstring);
$result = json_decode($content, true);
if ($result) {
    var_dump($result);
} else {
    //请求异常
}

/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
?>