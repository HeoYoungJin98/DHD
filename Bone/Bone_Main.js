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
                        Create_Bar_Chart('관절염 환자 비율 비교(단위: %)', location_Bar, '대전시 관절염 환자 비율', avg(Arthritis[2],Sum), '전국 관절염 환자 비율', Percent_All);
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
                        Create_Bar_Chart('골다공증 환자 비율 비교(단위: %)', location_Bar, '대전시 골다공증 환자 비율', avg(Osteoporosis[1],Sum), '전국 골다공증 환자 비율', Percent_All);
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
                        Create_Bar_Chart('관절염 환자 성비 비교(단위: %)', location_Bar, '대전시 남자', avg(Arthritis[0],Sum), '전국 남자', avg(Man_All,All),'대전시 여자', avg(Arthritis[1],Sum), '전국 여자', avg(Woman_All,All));
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
                        Create_Bar_Chart('골다공증 환자 성비 비교(단위: %)', location_Bar, '대전시 남자', avg(Osteoporosis[0],Sum), '전국 남자', avg(Man_All,All),'대전시 여자', avg(Osteoporosis[1],Sum), '전국 여자', avg(Woman_All,All));
                    });
                }
            }
        )
    }
    //Age Based Data
    function Get_Rate_Age(value){
        $.post(
            "Get_Rate_Age.php",
            {
                Code: value,
            },
            function(data){
                let Data = JSON.parse(data);
                if(value == 1){//Case Arthritis
                    let Arthritis = [];
                    let rate = [];
                    push(Arthritis,Data); //[30-40, 40-50, 50-60, 60-70, 70-80, over 80]
                    let location_Pie = document.getElementById("Ar_Age_Pie");
                    let location_Bar = document.getElementById("Ar_Age_bar");
                    let Sum = 0;
                    for(let i = 0; i<Arthritis.length; i++){
                        Sum += Arthritis[i];
                    }
                    for(let i = 0; i<Arthritis.length; i++){
                        rate.push(avg(Arthritis[i],Sum));
                    }
                    let Sum_All = 625;
                    let Ar_All = [2, 3, 16, 72, 222, 221, 89];
                    for(let i = 0; i<Ar_All.length; i++){
                        Ar_All[i] = avg(Ar_All[i], Sum_All);
                    }
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('나이별 관절염 환자 수(단위: 명)', location_Pie, '20대', Arthritis[0], '30대', Arthritis[1], '40대', Arthritis[2], '50대', Arthritis[3], '60대', Arthritis[4], '70대', Arthritis[5], '80대 이상', Arthritis[6]);
                        Create_Bar_Chart('나이별 관절염 환자 비율 비교(단위: %)', location_Bar, '대전시 20대', 0, '전국 20대', Ar_All[0], '대전시 30대', rate[0], '전국 30대', Ar_All[1], '대전시 40대', rate[1], '전국 40대', Ar_All[2], '대전시 50대', rate[2], '전국 50대', Ar_All[3], '대전시 60대', rate[3], '전국 60대', Ar_All[4], '대전시 70대', rate[4], '전국 70대', Ar_All[5], '대전시 80대 이상', rate[5], '전국 80대 이상', Ar_All[6]);
                    })
                }else{
                    let Osteoporosis = [];
                    let rate = [];
                    push(Osteoporosis, Data);// [50-60, 60-70, 70-80, over80]
                    let location_Pie = document.getElementById("Os_Age_Pie");
                    let location_Bar = document.getElementById("Os_Age_bar");
                    let Sum = 0;
                    for(let i = 0; i<Osteoporosis.length; i++){
                        Sum += Osteoporosis[i];
                    }
                    for(let i = 0; i<Osteoporosis.length; i++){
                        rate.push(avg(Osteoporosis[i],Sum));
                    }
                    let Sum_All = 356; //From Excel Data
                    let Os_All = [1, 4, 27, 130, 132, 62];//[30-40,40-50, ...]
                    for(let i = 0; i<Osteoporosis.length; i++){
                        Os_All[i] = avg(Os_All[i],Sum_All);
                    }
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('나이별 골다공증 환자 수(단위: 명)', location_Pie, '50대', Osteoporosis[0], '60대', Osteoporosis[1], '70대', Osteoporosis[2], '80대 이상', Osteoporosis[3]);
                        Create_Bar_Chart('나이별 골다공증 환자 비율 비교(단위: %)', location_Bar, '대전시 30대', 0, '전국 30대', Os_All[0], '대전시 40대', 0, '전국 40대', Os_All[1], '대전시 50대', rate[0], '전국 50대', Os_All[2], '대전시 60대', rate[1], '전국 60대', Os_All[3], '대전시 70대', rate[2], '전국 70대', Os_All[4], '대전시 80대 이상', rate[3], '전국 80대 이상', Os_All[5]);
                    })
                }
            }
        )
    }

})