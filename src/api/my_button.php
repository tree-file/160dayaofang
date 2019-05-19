<?php
/**
 * @Author: Marte
 * @Date:   2019-05-18 11:40:29
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-18 18:19:38
 */
    // header("Content-type: text/html; charset=utf-8");
    include 'conn.php';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';

    $sql = "INSERT INTO user (phone,psw) VALUES('$phone','$psw')";
    $res = $conn->query($sql);

?>