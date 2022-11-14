$(document).ready(function(){
    Get_Num_Disease();
    Get_Gender_Disease();

    function Get_Num_Disease(){
        $.post(
            "Get_Num_Disease.php",
            {},
            function(data){
                let loc_Pie = document.getElementById("HB_All_Pie");
                let loc_Bar = document.getElementById("HB_All_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Rate_Head");
                let loc_body = document.getElementById("Result_HB_Rate");
                let HB = []
                for(let i = 0; i<4; i++){
                    HB.push(parseInt(Data[1][i]));
                }
                let sum = Sum(HB);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('고혈압 현재 유병 여부(대전시)', loc_Pie, '있음', HB[0], '없음', HB[1], '비해당', HB[2], '모름', HB[3]);
                    Create_Bar_Chart('고혈압 환자 비율 비교(단위: %)', loc_Bar, '대전시 고혈압 환자 비율', avg(HB[1], sum), '전국 고혈압 환자 비율', avg(1481,6133));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }

    function Get_Gender_Disease(){
        $.post(
            "Get_Gender_Disease.php",
            {},
            function(data){
                let loc_Pie = document.getElementById("HB_Gender_Pie");
                let loc_Bar = document.getElementById("HB_Gender_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Gender_Head");
                let loc_body = document.getElementById("Result_HB_Gender");
                let HB = []
                for(let i=0; i<2; i++){
                    HB.push(parseInt(Data[1][i]));
                }
                let sum = Sum(HB);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('고혈압 환자 성비(대전시)', loc_Pie, '남성', HB[0], '여성', HB[1]);
                    Create_Bar_Chart('고혈압 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(HB[0], sum),'전국 남성', avg(693,1481),'대전시 여성', avg(HB[1],sum),'전국 여성', avg(788,1481));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }
})