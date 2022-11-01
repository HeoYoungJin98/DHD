<?php
include '../../Conn/Conn.php';

$sql = "SELECT COUNT(CASE WHEN arthritis = 1 then 1 end) as '관절염', COUNT(CASE WHEN Osteoporosis = 1 then 2 end) as '골다공증', COUNT(CASE WHEN HighBlood = 1 then 3 end) as '고혈압', COUNT(CASE WHEN asthma = 1 then 4 end)as '천식', COUNT(CASE WHEN diabetes = 1 then 5 end)as '당뇨병', COUNT(CASE WHEN stomach = 1 then 6 end)as '위암', COUNT(CASE WHEN liver = 1 then 7 end)as '간암', COUNT(CASE WHEN colorectal = 1 then 8 end)as '대장암', COUNT(CASE WHEN lung = 1 then 9 end)as '폐암', COUNT(CASE WHEN thyroid = 1 then 10 end)as '갑상선암', COUNT(CASE WHEN depression = 1 then 11 end)as '우울증', COUNT(CASE WHEN Rhinitis = 1 then 12 end)as '비염', COUNT(CASE WHEN HBV = 1 then 13 end)as 'B형간염', COUNT(CASE WHEN KD = 1 then 14 end)as '콩팥병', COUNT(CASE WHEN obesity = 1 then 15 end) as '비만', COUNT(CASE WHEN hypercholesterolemia = 1 then 16 end) as '고콜레스테롤혈증' FROM Health";
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