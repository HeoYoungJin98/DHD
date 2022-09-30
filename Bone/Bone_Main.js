$(document).ready(function(){
    //Rate about All people
    $.post(
        "Get_Rate.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let No_Answer = parseInt(Data[0]);
            let No = parseInt(Data[1]);
            let Yes = parseInt(Data[2]);
            let Not = parseInt(Data[3]);
            let location = document.getElementById("All_Pie");
            let location_Bar = document.getElementById("All_Bar");
            let Percent_Daejeon = Yes / (No_Answer + No + Yes + Not) * 100;
            let Percent_All =  625/7359 * 100; //From Excel Data
            google.charts.load('current',{'packages':['corechart']});
            google.charts.setOnLoadCallback(function(){
                Create_Chart('관절염 현재 유병 여부(대전시)',location, '무응답', No_Answer, '없음', No, '있음', Yes, '의사 진단 받지 않음', Not);
                Create_Bar_Chart('관절염 환자 비율(단위: %)', location_Bar, '대전 관절염 환자 비율', Percent_Daejeon, '전국 관절염 환자 비율', Percent_All);
            });
        }
    )

    //Gender Based Data
    $.post(
        "Get_Rate_Gender.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let Man = parseInt(Data[0]);
            let Woman = parseInt(Data[1]);
            let location = document.getElementById("Gender_Pie");
            let location_Bar = document.getElementById("Gender_Bar");
            let Man_All = 120; //From Excel Data =COUNTIFS(BR2:BR7360,1,I2:I7360,1)
            let Woman_All = 505; // =COUNTIFS(BR2:BR7360,1,I2:I7360,2)
            google.charts.load('current',{'packages':['corechart']});
            google.charts.setOnLoadCallback(function(){
                Create_Chart('관절염 환자 성비(단위: 명)', location, '남자', Man, '여자', Woman);
                Create_Bar_Chart('관절염 환자 성비(단위: %)', location_Bar, '대전시 남자', Man/(Man+Woman)*100,'대전시 여자', Woman/(Man+Woman)*100, '전국 남자', Man_All/(Man_All+Woman_All)*100,'전국 여자', Woman_All/(Man_All+Woman_All)*100);
            });
        }
    )

    //Age Based Data
    $.post(
        "Get_Rate_Age.php",
        {},
        function(data){
            let Data = JSON.parse(data);
        }
    )
})