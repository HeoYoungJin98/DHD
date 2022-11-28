$(document).ready(function(){
    Get_Num_Disease();
    Get_Gender_Disease();

    function Get_Num_Disease(){
        $.post(
            "Get_Num_Disease.php",
            {},
            function(data){
                let loc_Pie = document.getElementById("Hyper_All_Pie");
                let loc_Bar = document.getElementById("Hyper_All_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Rate_Head");
                let loc_body = document.getElementById("Result_Hyper_Rate");
                let Hyper = []
                for(let i = 0; i<4; i++){
                    Hyper.push(parseInt(Data[1][i]));
                }
                let sum = Sum(Hyper);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('고콜레스테롤혈증 현재 유병 여부(대전시)', loc_Pie, '없음', Hyper[0], '있음', Hyper[1], '모름', Hyper[2], '무응답', Hyper[3]);
                    Create_Bar_Chart('고콜레스테롤혈증 환자 비율 비교(단위: %)', loc_Bar, '대전시 고콜레스테롤혈증 환자 비율', avg(Hyper[1], sum), '전국 고콜레스테롤혈증 환자 비율', avg(1485,6133));
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
                let loc_Pie = document.getElementById("Hyper_Gender_Pie");
                let loc_Bar = document.getElementById("Hyper_Gender_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Gender_Head");
                let loc_body = document.getElementById("Result_Hyper_Gender");
                let Hyper = []
                for(let i=0; i<2; i++){
                    Hyper.push(parseInt(Data[1][i]));
                }
                let sum = Sum(Hyper);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('고콜레스테롤혈증 환자 성비(대전시)', loc_Pie, '남성', Hyper[0], '여성', Hyper[1]);
                    Create_Bar_Chart('고콜레스테롤혈증 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(Hyper[0], sum),'전국 남성', avg(604,1485),'대전시 여성', avg(Hyper[1],sum),'전국 여성', avg(881,1485));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }
})