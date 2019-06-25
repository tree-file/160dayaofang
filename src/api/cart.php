<?php
/**
 * @Author: Marte
 * @Date:   2019-05-20 11:44:21
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-22 00:27:22
 */
    header('content-type:text/html;charset=utf-8');
    include './conn.php';
    $gid = isset($_GET['gid'])?$_GET['gid']:'';
    $num = isset($_GET['num'])?$_GET['num']:'';
    $num1 = isset($_GET['num1'])?$_GET['num1']:'';
    $val = isset($_GET['val'])?$_GET['val']:'';
    $goodsid = isset($_GET['goodsid'])?$_GET['goodsid']:'';
    $rem = isset($_GET['rem'])?$_GET['rem']:'';
    
        $isok = isset($_GET['isok'])?$_GET['isok']:false;
    if($isok){
    $sql4 = "SELECT * FROM list WHERE gid=$gid";
        $res4 = $conn->query($sql4);
        $cont = $res4->fetch_all(MYSQLI_ASSOC);
        $cid = $cont[0]['gid'];
        $src = $cont[0]['src'];
        $title = $cont[0]['title'];
        $price = $cont[0]['price'];
        $sql5 = "SELECT * FROM car WHERE gid=$gid";
        $res5 = $conn->query($sql5);
           if($res5->num_rows==1){
            $sql6 = "UPDATE car SET shu=$num+shu WHERE gid=$gid";
            $res6 = $conn->query($sql6);
        }else{
            $sql7 = "INSERT INTO car(title,src,shu,price,gid) VALUES('$title','$src',$num,$price,$gid)";
            $res7 = $conn->query($sql7);
        }
}
    $sql2 = "SELECT * FROM `car`";
        $res2 = $conn->query($sql2);
            $content2 = $res2->fetch_all(MYSQLI_ASSOC);
             $datalist = array(
        'data2'=> $content2,
    );


                            $sql ="UPDATE car SET shu = $val WHERE gid = $goodsid";
        $res = $conn->query($sql);
            
            $sql_rem = "DELETE FROM car WHERE gid = $rem";
        $res_rem = $conn->query($sql_rem);


    echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
?>