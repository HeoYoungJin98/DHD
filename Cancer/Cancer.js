$(document).ready(function(){
    Get_Num_Disease(1)
    Get_Gender_Disease(1)
    //Click arthritis or osteoporosis
    $("input[name=disease]").on("click",function(){
        let disease_code = $(this).val(); //clicked value
        // 1 = arthritis, 2 = osteoporosis
        if(disease_code == 1){
            $("#liver_Charts").css('display','none'); //change css about osteoporosis charts area
            $("#stomach_Charts").css('display','');
            Get_Num_Disease(1)
            Get_Gender_Disease(1)
        }else{
            $("#liver_Charts").css('display','');
            $("#stomach_Charts").css('display','none');
            Get_Num_Disease(2)
            Get_Gender_Disease(2)
        }
    })

    function Get_Num_Disease(value){
        $.post(
            "Get_Num_Disease.php",
            {
                Code: value,
            },
            function(data){
                if(value == 1){
                    let loc_Pie = document.getElementById("stomach_All_Pie");
                    let loc_Bar = document.getElementById("stomach_All_Bar");
                    let Data = JSON.parse(data);
                    let loc_head = document.getElementById("Rate_stomach_Head");
                    let loc_body = document.getElementById("Result_stomach_Rate");
                    let stomach = []
                    for(let i = 0; i<4; i++){
                        stomach.push(parseInt(Data[1][i]));
                    }
                    let sum = Sum(stomach);
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('위암 현재 유병 여부(대전시)', loc_Pie,'없음', stomach[0], '있음', stomach[1], '모름', stomach[2], '무응답', stomach[3]);
                        Create_Bar_Chart('위암 환자 비율 비교(단위: %)', loc_Bar, '위암 환자 비율', avg(stomach[1], sum), '전국 위암 환자 비율', avg(10,6133));
                })
                    Create_Table(Data, loc_head, loc_body);
                }else{
                    let loc_Pie = document.getElementById("liver_All_Pie");
                    let loc_Bar = document.getElementById("liver_All_Bar");
                    let Data = JSON.parse(data);
                    let loc_head = document.getElementById("Rate_liver_Head");
                    let loc_body = document.getElementById("Result_liver_Rate");
                    let liver = []
                    for(let i = 0; i<4; i++){
                        liver.push(parseInt(Data[1][i]));
                    }
                    let sum = Sum(liver);
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('간암 현재 유병 여부(대전시)', loc_Pie,'있음', liver[1], '모름', liver[2], '무응답', liver[3]);
                        Create_Bar_Chart('간암 환자 비율 비교(단위: %)', loc_Bar, '간암 환자 비율', avg(liver[1], sum), '전국 간암 환자 비율', avg(4,6133));
                })
                    Create_Table(Data, loc_head, loc_body);
                }
            }
        )
    }

    function Get_Gender_Disease(value){
        $.post(
            "Get_Gender_Disease.php",
            {
                Code: value
            },
            function(data){
                if(value == 1){
                    let loc_Pie = document.getElementById("stomach_Gender_Pie");
                    let loc_Bar = document.getElementById("stomach_Gender_Bar");
                    let Data = JSON.parse(data);
                    let loc_head = document.getElementById("Gender_stomach_Head");
                    let loc_body = document.getElementById("Result_stomach_Gender");
                    let stomach = []
                    for(let i=0; i<2; i++){
                        stomach.push(parseInt(Data[1][i]));
                    }
                    let sum = Sum(stomach);
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('위암 환자 성비(대전시)', loc_Pie, '남성', stomach[0], '여성', stomach[1]);
                        Create_Bar_Chart('위암 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(stomach[0], sum),'전국 남성', avg(8,10),'대전시 여성', avg(stomach[1],sum),'전국 여성', avg(2,10));
                    })
                    Create_Table(Data, loc_head, loc_body);
                }else{
                    let loc_Pie = document.getElementById("liver_Gender_Pie");
                    let loc_Bar = document.getElementById("liver_Gender_Bar");
                    let Data = JSON.parse(data);
                    let loc_head = document.getElementById("Gender_liver_Head");
                    let loc_body = document.getElementById("Result_liver_Gender");
                    let liver = []
                    for(let i=0; i<2; i++){
                        liver.push(parseInt(Data[1][i]));
                    }
                    let sum = Sum(liver);
                    google.charts.load('current',{'packages':['corechart']});
                    google.charts.setOnLoadCallback(function(){
                        Create_Chart('간암 환자 성비(대전시)', loc_Pie, '남성', liver[0], '여성', liver[1]);
                        Create_Bar_Chart('간암 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(liver[0], sum),'전국 남성', avg(3,4),'대전시 여성', avg(liver[1],sum),'전국 여성', avg(1,4));
                    })
                    Create_Table(Data, loc_head, loc_body);
                }
            }
        )
    }
})