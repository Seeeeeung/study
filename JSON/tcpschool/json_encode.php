<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>JSON Use</title>
</head>
<body>

<?php
	$value = array('apple' => 'Fruits', '1' => '참', '참' => true); // php배열
	echo json_encode($value);
?>
</body>
</html>