<?php
 header('content-type:text/html;charset=utf-8');
    //设置编码
    include './conn.php';
    $phone = isset($_POST['phone'])?$_POST['phone']:'1';
    $psw = isset($_POST['psw'])?$_POST['psw']:'1';
    $sql = "SELECT * FROM user WHERE  phone='$phone' AND psw='$psw'";
    $res = $conn->query($sql);
     if($res->num_rows){
        echo 1;
    }else{
        echo 0;
    }
?>