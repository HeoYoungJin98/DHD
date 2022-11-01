<?php
include '../../Conn/Conn.php';

$sql = "SELECT COUNT(CASE WHEN 체질량지수 < 18.5 THEN 1 end) as '저체중', COUNT(CASE WHEN 18.5 <= 체질량지수 and 체질량지수 < 23 THEN 2 end) as'정상', COUNT(CASE WHEN 23<=체질량지수 and 체질량지수 <25 THEN 3 end) as '과체중', COUNT(CASE WHEN 체질량지수 >= 25 THEN 4 end) as '비만',COUNT(CASE WHEN 체질량지수 is NULL THEN 5 end) as '비측정' FROM Health GROUP BY SEX";
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