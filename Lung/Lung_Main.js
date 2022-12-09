$(document).ready(function(){
    Get_Num_Disease();
    Get_Gender_Disease();
    Get_nutrition();

    function Get_Num_Disease(){
        $.post(
            "Get_Num_Disease.php",
            {},
            function(data){
                let loc_Pie = document.getElementById("As_All_Pie");
                let loc_Bar = document.getElementById("As_All_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Rate_Head");
                let loc_body = document.getElementById("Result_Asthma_Rate");
                let Asthma = []
                for(let i = 0; i<4; i++){
                    Asthma.push(parseInt(Data[1][i]));
                }
                let sum = Sum(Asthma);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('천식 현재 유병 여부(대전시)', loc_Pie, '있음', Asthma[0], '없음', Asthma[1], '비해당', Asthma[2], '모름', Asthma[3]);
                    Create_Bar_Chart('천식 환자 비율 비교(단위: %)', loc_Bar, '대전시 천식 환자 비율', avg(Asthma[1], sum), '전국 천식 환자 비율', avg(119,6133));
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
                let loc_Pie = document.getElementById("As_Gender_Pie");
                let loc_Bar = document.getElementById("As_Gender_Bar");
                let Data = JSON.parse(data);
                console.log(Data);
                let loc_head = document.getElementById("Gender_Head");
                let loc_body = document.getElementById("Result_Asthma_Gender");
                let Asthma = []
                for(let i=0; i<2; i++){
                    Asthma.push(parseInt(Data[1][i]));
                }
                let sum = Sum(Asthma);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('천식 환자 성비(대전시)', loc_Pie, '남성', Asthma[0], '여성', Asthma[1]);
                    Create_Bar_Chart('천식 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(Asthma[0], sum),'전국 남성', avg(52, 119),'대전시 여성', avg(Asthma[1],sum),'전국 여성', avg(67, 119));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }

    function Get_nutrition(){
        var loc_head = document.getElementById("As_nu_Head");
        var loc_body = document.getElementById("As_nu_Body");
        $.post("Get_nutrition.php",{})
        .done(function(data){
            let Data = JSON.parse(data);
            Create_Table(Data, loc_head, loc_body);
        })
        .fail(function(jqXHR, textStatus, error){
            if(jqXHR.status == 404){
                alert("page not found!");
            }else if(jqXHR.status == 500){
                alert("server error!");
            }
        })
    }
})