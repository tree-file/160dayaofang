<?php
	//连接数据库
	include 'conn.php';
	header("Content-type: text/html; charset=utf-8");
	mysqli_query($conn,"set names utf8");
	//接收参数
	$page = isset($_GET['page']) ? $_GET['page'] : '1';//第几页
	$type = isset($_GET['type']) ? $_GET['type'] : 'id';
	$order = isset($_GET['order']) ? $_GET['order'] : 'ASC';
	//写sql语句
	$index = ($page - 1) * 12;
	// $sql = "SELECT * FROM list ORDER BY $type $order LIMIT $index ,12";
	// if($order) {
		//有排序
		$sql = "SELECT * FROM list ORDER BY $type $order LIMIT $index, 12";	
	// }else {
	// 	//没有排序
	// 	$sql = "SELECT * FROM list LIMIT $index,12";
	// }
	//执行语句
	$res = $conn->query($sql);
	//获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	//获取总条数
	$sql2 = 'SELECT * FROM list';
	//执行语句
	$res2 = $conn->query($sql2);
	$data = array(
		'total' => $res2->num_rows,//总条数
		'goodslist' => $content,
		'page' => $page,
	);
	
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>