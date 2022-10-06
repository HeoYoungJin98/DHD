<?php
include '../../Conn/Conn.php';

$Code = $_POST["Code"];
$sql = null;

if($Code == 1){
    $sql = "SELECT COUNT(*) FROM Health WHERE arthritis = 1 GROUP BY AGE";
}else{
    $sql = "SELECT COUNT(*) FROM Health WHERE Osteoporosis = 1 GROUP BY AGE";
}

$Data = mysqli_query($db_conn, $sql);
$Result_Array = array();

while($Result = mysqli_fetch_array($Data)){
    array_push($Result_Array, $Result[0]);
}

echo json_encode($Result_Array);

mysqli_close($db_conn);
