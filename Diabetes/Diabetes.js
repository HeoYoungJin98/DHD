$(document).ready(function(){
    Get_Num_Disease();
    Get_Gender_Disease();

    function Get_Num_Disease(){
        $.post(
            "Get_Num_Disease.php",
            {},
            function(data){
                let loc_Pie = document.getElementById("Diabetes_All_Pie");
                let loc_Bar = document.getElementById("Diabetes_All_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Rate_Head");
                let loc_body = document.getElementById("Result_Diabetes_Rate");
                let Diabetes = []
                for(let i = 0; i<4; i++){
                    Diabetes.push(parseInt(Data[1][i]));
                }
                let sum = Sum(Diabetes);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('당뇨병 현재 유병 여부(대전시)', loc_Pie, '있음', Diabetes[1], '모름', Diabetes[2], '무응답', Diabetes[3]);
                    Create_Bar_Chart('당뇨병 환자 비율 비교(단위: %)', loc_Bar, '당뇨병 환자 비율', avg(Diabetes[1], sum), '전국 당뇨병 환자 비율', avg(661,6133));
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
                let loc_Pie = document.getElementById("Diabetes_Gender_Pie");
                let loc_Bar = document.getElementById("Diabetes_Gender_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Gender_Head");
                let loc_body = document.getElementById("Result_Diabetes_Gender");
                let Diabetes = []
                for(let i=0; i<2; i++){
                    Diabetes.push(parseInt(Data[1][i]));
                }
                let sum = Sum(Diabetes);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('당뇨병 환자 성비(대전시)', loc_Pie, '남성', Diabetes[0], '여성', Diabetes[1]);
                    Create_Bar_Chart('당뇨병 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(Diabetes[0], sum),'전국 남성', avg(310,661),'대전시 여성', avg(Diabetes[1],sum),'전국 여성', avg(351,661));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }
})