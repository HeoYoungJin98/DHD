<?php
include '../../Conn/Conn.php';

$Code = $_POST["Code"];
$sql = null;

if($Code == 1){
    $sql = "SELECT COUNT(CASE WHEN stomach = 0 THEN 0 end) as '없음', COUNT(CASE WHEN stomach = 1 THEN 1 end) as '있음', COUNT(CASE WHEN stomach = 8 THEN 2 end) as '모름', COUNT(CASE WHEN stomach = 9 OR stomach is NULL THEN 3 end) as '무응답' FROM Health";
}else{
    $sql = "SELECT COUNT(CASE WHEN liver = 0 THEN 0 end) as '없음', COUNT(CASE WHEN liver = 1 THEN 1 end) as '있음', COUNT(CASE WHEN liver = 8 THEN 2 end) as '모름', COUNT(CASE WHEN liver = 9 OR liver is NULL THEN 3 end) as '무응답' FROM Health";
}


$Data = mysqli_query($db_conn, $sql);
$Result_Array = array();

//$row = mysqli_fetch_assoc($Data);
while($Result = mysqli_fetch_assoc($Data)){
    array_push($Result_Array, array_keys($Result));
    array_push($Result_Array, array_values($Result));
}

echo json_encode($Result_Array);

mysqli_close($db_conn);
?>