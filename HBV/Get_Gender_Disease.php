<?php
include '../../Conn/Conn.php';

$sql = "SELECT COUNT(CASE WHEN SEX = 1 THEN 1 end) as '남성', COUNT(CASE WHEN SEX = 2 THEN 2 end) as '여성' FROM Health WHERE HBV = 1";
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