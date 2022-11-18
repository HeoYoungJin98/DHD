$(document).ready(function(){
    Get_Num_Disease();
    Get_Gender_Disease();

    function Get_Num_Disease(){
        $.post(
            "Get_Num_Disease.php",
            {},
            function(data){
                let loc_Pie = document.getElementById("HBV_All_Pie");
                let loc_Bar = document.getElementById("HBV_All_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Rate_Head");
                let loc_body = document.getElementById("Result_HBV_Rate");
                let HBV = []
                for(let i = 0; i<4; i++){
                    HBV.push(parseInt(Data[1][i]));
                }
                let sum = Sum(HBV);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('B형간염 현재 유병 여부(대전시)', loc_Pie, '있음', HBV[0], '없음', HBV[1], '비해당', HBV[2], '모름', HBV[3]);
                    Create_Bar_Chart('B형간염 환자 비율 비교(단위: %)', loc_Bar, '대전시 B형간염 환자 비율', avg(HBV[1], sum), '전국 B형간염 환자 비율', avg(22,6133));
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
                let loc_Pie = document.getElementById("HBV_Gender_Pie");
                let loc_Bar = document.getElementById("HBV_Gender_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Gender_Head");
                let loc_body = document.getElementById("Result_HBV_Gender");
                let HBV = []
                for(let i=0; i<2; i++){
                    HBV.push(parseInt(Data[1][i]));
                }
                let sum = Sum(HBV);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('B형간염 환자 성비(대전시)', loc_Pie, '남성', HBV[0], '여성', HBV[1]);
                    Create_Bar_Chart('B형간염 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(HBV[0], sum),'전국 남성', avg(18,22),'대전시 여성', avg(HBV[1],sum),'전국 여성', avg(4,22));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }
})