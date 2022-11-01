<?php
include '../../Conn/Conn.php';

$sql = "SELECT COUNT(CASE WHEN 신장 >= 140 and 신장 <150 THEN 1 end) as '140-150', COUNT(CASE WHEN 신장 >= 150 and 신장 <160 THEN 2 end) as '150-160', COUNT(CASE WHEN 신장 >= 160 and 신장 <170 THEN 3 end) as '160-170', COUNT(CASE WHEN 신장 >= 170 and 신장 <180 THEN 4 end) as '170-180', COUNT(CASE WHEN 신장 >= 180 THEN 5 end) as '180 이상' FROM Health GROUP BY SEX";
$Data = mysqli_query($db_conn, $sql);
$Result_Array = array();

if($Data = mysqli_query($db_conn,$sql)){
    while($Result = mysqli_fetch_row($Data)){
        for($i = 0; $i<count($Result); $i++){
            array_push($Result_Array, $Result[$i]);
        }
    }
}

echo json_encode($Result_Array);

mysqli_close($db_conn);
?>