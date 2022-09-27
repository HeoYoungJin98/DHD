<?php
include '../../Conn/Conn.php';

$sql = "SELECT COUNT(*) FROM Health GROUP BY AGE";
$Data = mysqli_query($db_conn, $sql);
$Result_Array = array();

while($Result = mysqli_fetch_array($Data)){
    array_push($Result_Array, $Result[0]);
}

echo json_encode($Result_Array);

mysqli_close($db_conn);
?>