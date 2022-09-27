$(document).ready(function(){
    //Bring Data about Sex Ratio
    $.post(
        "Get_Sex_ratio.php",
        {
        },
        function(data){
            let Data = JSON.parse(data);
            let Man = parseInt(Data[0]);
            let Woman = parseInt(Data[1]);
            let location = document.getElementById("SexChartCanvas");
            //Load google chart API
            google.charts.load('current', {'packages':['corechart']});
            //Call Draw Chart
            google.charts.setOnLoadCallback(function(){
                //Another File's function
                Create_Chart('참여자 성비(만 19세 이상)', location, 'Man', Man, 'Woman', Woman);
            });
        }
    )
    //Bring Data about District
    $.post(
        "Get_Age_ratio.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let a10 = parseInt(Data[0]);
            let a20 = parseInt(Data[1]);
            let a30 = parseInt(Data[2]);
            let a40 = parseInt(Data[3]);
            let a50 = parseInt(Data[4]);
            let a60 = parseInt(Data[5]);
            let a70 = parseInt(Data[6]);
            let location = document.getElementById("Age");
            google.charts.load('current',{'packages':['corechart']});
            google.charts.setOnLoadCallback(function(){
                Create_Chart('참여자 나이', location, '20대', a10, '30대', a20, '40대', a30, '50대', a40, '60대', a50, '70대', a60, '80대 이상', a70);
            })
        }
    )

    //Bring Data about BMI
    $.post(
        "Get_BMI.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let under = parseInt(Data[0]);
            let nomal = parseInt(Data[1]);
            let over = parseInt(Data[2]);
            let obe = parseInt(Data[3]);
            let location = document.getElementById("BMI");
            google.charts.load('current',{'packages':['corechart']});
            google.charts.setOnLoadCallback(function(){
                Create_Chart('참여자 BMI', location, '저체중', under, '정상', nomal, '과체중', over, '비만', obe);
            })
        }
    )
})