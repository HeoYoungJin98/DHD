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
                Create_Bar_Chart('관절염 환자 비율(단위: %)', location_Bar, '대전시 관절염 환자 비율', Percent_Daejeon, '전국 관절염 환자 비율', Percent_All);
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
            let d_all = Man + Woman;
            let location = document.getElementById("Gender_Pie");
            let location_Bar = document.getElementById("Gender_Bar");
            let Man_All = 120; //From Excel Data =COUNTIFS(BR2:BR7360,1,I2:I7360,1)
            let Woman_All = 505; // =COUNTIFS(BR2:BR7360,1,I2:I7360,2)
            let All = 625;
            google.charts.load('current',{'packages':['corechart']});
            google.charts.setOnLoadCallback(function(){
                Create_Chart('관절염 환자 성비(단위: 명)', location, '남자', Man, '여자', Woman);
                Create_Bar_Chart('관절염 환자 성비(단위: %)', location_Bar, '대전시 남자', avg(Man,d_all), '전국 남자', avg(Man_All,All),'대전시 여자', avg(Woman,d_all), '전국 여자', avg(Woman_All,All));
            });
        }
    )

    //Age Based Data
    $.post(
        "Get_Rate_Age.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let d30 = parseInt(Data[0]); //30-40
            let d40 = parseInt(Data[1]); //40-50
            let d50 = parseInt(Data[2]); //50-60
            let d60 = parseInt(Data[3]); //60-70
            let d70 = parseInt(Data[4]); //70-80
            let d80 = parseInt(Data[5]); //over 80
            let d_all = d30 + d40 + d50 + d60 + d70 + d80;
            let location_Pie = document.getElementById("Age_Pie");
            let location_Bar = document.getElementById("Age_bar");
            let a20 = 2; //=COUNTIFS(BR2:BR7360,1,K2:K7360,20)
            let a30 = 3; //==COUNTIFS(BR2:BR7360,1,K2:K7360,30)
            let a40 = 16; //=COUNTIFS(BR2:BR7360,1,K2:K7360,40)
            let a50 = 72; //=COUNTIFS(BR2:BR7360,1,K2:K7360,50)
            let a60 = 222; //=COUNTIFS(BR2:BR7360,1,K2:K7360,60)
            let a70 = 221; //=COUNTIFS(BR2:BR7360,1,K2:K7360,70)
            let a80 = 89; //=COUNTIFS(BR2:BR7360,1,K2:K7360,80)
            let a_all = a20 + a30 + a40 + a50 + a60 + a70 + a80;
            google.charts.load('current',{'packages':['corechart']});
            google.charts.setOnLoadCallback(function(){
                Create_Chart('나이대별 관절염 환자 수',location_Pie, '20대',0,'30대',d30,'40대',d40,'50대',d50,'60대',d60,'70대',d70,'80대',d80)
                Create_Bar_Chart('관절염 환자 수 비율(대전시, 전국)',location_Bar, '대전시 20대', 0, '전국 20대', avg(a20,a_all), '대전시 30대', avg(d30,d_all), '전국 30대', avg(a30,a_all), '대전시 40대', avg(d40,d_all), '전국 40대', avg(a40,a_all), '대전시 50대', avg(d50,d_all), '전국 50대', avg(a50, a_all), '대전시 60대', avg(d60,d_all), '전국 60대', avg(a60,a_all), '대전시 70대', avg(d70,d_all), '전국 70대',avg(a70,a_all), '대전시 80대', avg(d80,d_all), '전국 80대', avg(a80,a_all));
            });
        }
    )
    
    
    function avg(numerator, denominator){
        let result = numerator/denominator*100;
        return result;
    }
})