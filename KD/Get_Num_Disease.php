<?php
include '../../Conn/Conn.php';

$sql = "SELECT COUNT(CASE WHEN KD = 0 THEN 0 end) as '없음', COUNT(CASE WHEN KD = 1 THEN 1 end) as '있음', COUNT(CASE WHEN KD = 8 THEN 2 end) as '모름', COUNT(CASE WHEN KD = 9 OR KD is NULL THEN 3 end) as '무응답' FROM Health";

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