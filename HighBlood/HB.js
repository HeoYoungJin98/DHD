$(document).ready(function(){
    Get_Num_Disease();


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
                let Asthma = []
                for(let i = 0; i<4; i++){
                    Asthma.push(parseInt(Data[1][i]));
                }
                let sum = Sum(Asthma);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('고혈압 현재 유병 여부(대전시)', loc_Pie, '있음', Asthma[0], '없음', Asthma[1], '비해당', Asthma[2], '모름', Asthma[3]);
                    Create_Bar_Chart('고혈압 환자 비율 비교(단위: %)', loc_Bar, '대전시 고혈압 환자 비율', avg(Asthma[1], sum), '전국 고혈압 환자 비율', avg(170,6133));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }
})