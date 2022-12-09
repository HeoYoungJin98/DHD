<?php
include '../../Conn/Conn.php';

$sql = "SELECT ROUND(AVG(moisture),3) as '수분(g)' , ROUND(AVG(protein),3) as '단백질(g)', ROUND(AVG(Fat),3) as '지방(g)', ROUND(AVG(carbohydrate),3) as '탄수화물(g)', ROUND(AVG(DietaryFiber),3) as '식이섬유(g)', ROUND(AVG(sugar),3) as '당(g)', ROUND(AVG(calcium),3) as '칼슘(g)', ROUND(AVG(salt),3) as '나트륨(g)', ROUND(AVG(potassium),3) as '칼륨(g)' FROM Health WHERE depression = 1";

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