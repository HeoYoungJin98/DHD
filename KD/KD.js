$(document).ready(function(){
    Get_Num_Disease();
    Get_Gender_Disease();
    Get_nutrition();

    function Get_Num_Disease(){
        $.post(
            "Get_Num_Disease.php",
            {},
            function(data){
                let loc_Pie = document.getElementById("KD_All_Pie");
                let loc_Bar = document.getElementById("KD_All_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Rate_Head");
                let loc_body = document.getElementById("Result_KD_Rate");
                let KD = []
                for(let i = 0; i<4; i++){
                    KD.push(parseInt(Data[1][i]));
                }
                let sum = Sum(KD);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('콩팥병 현재 유병 여부(대전시)', loc_Pie, '있음', KD[0], '없음', KD[1], '비해당', KD[2], '모름', KD[3]);
                    Create_Bar_Chart('콩팥병 환자 비율 비교(단위: %)', loc_Bar, '대전시 콩팥병 환자 비율', avg(KD[1], sum), '전국 콩팥병 환자 비율', avg(56,6133));
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
                let loc_Pie = document.getElementById("KD_Gender_Pie");
                let loc_Bar = document.getElementById("KD_Gender_Bar");
                let Data = JSON.parse(data);
                let loc_head = document.getElementById("Gender_Head");
                let loc_body = document.getElementById("Result_KD_Gender");
                let KD = []
                for(let i=0; i<2; i++){
                    KD.push(parseInt(Data[1][i]));
                }
                let sum = Sum(KD);
                google.charts.load('current',{'packages':['corechart']});
                google.charts.setOnLoadCallback(function(){
                    Create_Chart('콩팥병 환자 성비(대전시)', loc_Pie, '남성', KD[0], '여성', KD[1]);
                    Create_Bar_Chart('콩팥병 환자 비교(단위: %)', loc_Bar, '대전시 남성', avg(KD[0], sum),'전국 남성', avg(29,56),'대전시 여성', avg(KD[1],sum),'전국 여성', avg(27,56));
                })
                Create_Table(Data, loc_head, loc_body);
            }
        )
    }
    function Get_nutrition(){
        var loc_head = document.getElementById("KD_nu_Head");
        var loc_body = document.getElementById("KD_nu_Body");
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