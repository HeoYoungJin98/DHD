$(document).ready(function(){
    Get_Rate(1)
    Get_Rate_Gender(1)
    Get_Rate_Age(1)
    //Click arthritis or osteoporosis
    $("input[name=disease]").on("click",function(){
        let disease_code = $(this).val(); //clicked value
        // 1 = arthritis, 2 = osteoporosis
        if(disease_code == 1){
            $("#Osteoporosis_Charts").css('display','none'); //change css about osteoporosis charts area
            $("#Arthritis_Charts").css('display','');
            Get_Rate(1)
            Get_Rate_Gender(1)
            Get_Rate_Age(1)
        }else{
            $("#Osteoporosis_Charts").css('display','');
            $("#Arthritis_Charts").css('display','none');
            Get_Rate(2)
            Get_Rate_Gender(2)
            Get_Rate_Age(2)
        }
    })

    //avg function
    function avg(numerator, denominator){
        let result = numerator/denominator*100;
        return result;
    }

    //Add parsed data to array
    function push(arr,data){
        for(let i = 0; i<data.length; i++){
            arr.push(parseInt(data[i]));
        }
        return arr;
    }

    //Rate about All people
    function Get_Rate(value){
        $.post(
            "Get_Rate.php",
            {
                Code: value,
            },
            function(data){
                let Data = JSON.parse(data);
                if(value == 1){
                    let Arthritis = [];
                    push(Arthritis,Data); //[No_Answer, No, Yes, Not]
                    let location = document.getElementById("Ar_All_Pie");
                    let location_Bar = document.getElementById("Ar_All_Bar");
                    let Sum = 0;
                    for(let i = 0; i<Arthritis.length; i++){
                        Sum += Arthritis[i];
                    }
                    let Percent_All =  625/6133 * 100; //From Excel Data
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('관절염 현재 유병 여부(대전시)',location, '무응답', Arthritis[0], '없음', Arthritis[1], '있음', Arthritis[2], '의사 진단 받지 않음', Arthritis[3]);
                        Create_Bar_Chart('관절염 환자 비율(단위: %)', location_Bar, '대전시 관절염 환자 비율', avg(Arthritis[2],Sum), '전국 관절염 환자 비율', Percent_All);
                    });
                }else{
                    let Osteoporosis = [];
                    push(Osteoporosis,Data); //[No, Yes, Not, No_Answer]
                    let location = document.getElementById("Os_All_Pie");
                    let location_Bar = document.getElementById("Os_All_Bar");
                    let Sum = 0;
                    for(let i = 0; i<Osteoporosis.length; i++){
                        Sum += Osteoporosis[i];
                    }
                    let Percent_All = 356/6133 * 100; //From Excel Data =COUNTIF(CD2:CD7360,1)
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('골다공증 현재 유병 여부(대전시)',location, '모름, 무응답', Osteoporosis[3], '없음', Osteoporosis[0], '있음', Osteoporosis[1], '비해당', Osteoporosis[2]);
                        Create_Bar_Chart('골다공증 환자 비율(단위: %)', location_Bar, '대전시 골다공증 환자 비율', avg(Osteoporosis[1],Sum), '전국 골다공증 환자 비율', Percent_All);
                    })
                }
            }
        )
    }

    //Gender Based Data
    function Get_Rate_Gender(value){
        $.post(
            "Get_Rate_Gender.php",
            {
                Code: value,
            },
            function(data){
                let Data = JSON.parse(data);
                if(value == 1){
                    let Arthritis = [];
                    push(Arthritis,Data); //[Man,Woman]
                    let location = document.getElementById("Ar_Gender_Pie");
                    let location_Bar = document.getElementById("Ar_Gender_Bar");
                    let Sum = 0;
                    for(let i = 0; i<Arthritis.length; i++){
                        Sum += Arthritis[i];
                    }
                    let Man_All = 120; //From Excel Data =COUNTIFS(BR2:BR6134,1,I2:I6134,1)
                    let Woman_All = 505; // =COUNTIFS(BR2:BR6134,1,I2:I6134,2)
                    let All = 625;
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('관절염 환자 성비(단위: 명)', location, '남자', Arthritis[0], '여자', Arthritis[1]);
                        Create_Bar_Chart('관절염 환자 성비(단위: %)', location_Bar, '대전시 남자', avg(Arthritis[0],Sum), '전국 남자', avg(Man_All,All),'대전시 여자', avg(Arthritis[1],Sum), '전국 여자', avg(Woman_All,All));
                    });
                }else{
                    let Osteoporosis = [];
                    push(Osteoporosis,Data);  //[Man,Woman]
                    let location = document.getElementById("Os_Gender_Pie");
                    let location_Bar = document.getElementById("Os_Gender_Bar");
                    let Sum = 0;
                    for(let i = 0; i<Osteoporosis.length; i++){
                        Sum += Osteoporosis[i];
                    }
                    let Man_All = 24;
                    let Woman_All = 332;
                    let All = 356;
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('골다공증 환자 성비(단위: 명)', location, '남자', Osteoporosis[0], '여자', Osteoporosis[1]);
                        Create_Bar_Chart('골다공증 환자 성비(단위: %)', location_Bar, '대전시 남자', avg(Osteoporosis[0],Sum), '전국 남자', avg(Man_All,All),'대전시 여자', avg(Osteoporosis[1],Sum), '전국 여자', avg(Woman_All,All));
                    });
                }
            }
        )
    }

    function Get_Rate_Age(value){

    }

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
            let location_Pie = document.getElementById("Ar_Age_Pie");
            let location_Bar = document.getElementById("Ar_Age_bar");
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


})