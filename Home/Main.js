$(document).ready(function(){
    //Create Table Function.
    //location = div location. arr = array. Mode = 1to8 or 8to16
    function CreateTable(location,arr,Mode){
        let Sarr = ['20대','30대','40대','50대','60대','70대','80대 이상'];
        let array = arr;
        let Row = 0;
        if(Mode <=3 ){
            Row = array.length / 16;
        }else{
            Row = array.length / 5;
        }
        let r = 0;
        while(r < Row){
            let Create_Tr = document.createElement("tr");
            let loc = location;
            loc.appendChild(Create_Tr);
            if(Mode == 1){
                for(let i = 0; i<9; i++){
                    let Create_Td = document.createElement("td");
                    if(i == 0){
                        let Text = document.createTextNode(Sarr[r]);
                        Create_Td.appendChild(Text);
                    }else{
                        let Text = document.createTextNode(array[r*16+(i-1)]);
                        Create_Td.appendChild(Text);
                    }
                    Create_Tr.appendChild(Create_Td);
                }
            }else if(Mode == 2){
                for(let i = 8; i<17; i++){
                    let Create_Td = document.createElement("td");
                    if(i == 8){
                        let Text = document.createTextNode(Sarr[r]);
                        Create_Td.appendChild(Text);
                    }else{
                        let Text = document.createTextNode(array[r*16+(i-1)]);
                        Create_Td.appendChild(Text);
                    }
                    Create_Tr.appendChild(Create_Td);
                }
            }else if(Mode == 3){//Get the number of people by disease
                for(let i = 0; i<17; i++){
                    let Create_Td = document.createElement("td");
                    if(i == 0){
                        let Text = document.createTextNode('인원 수');
                        Create_Td.appendChild(Text);
                    }else{
                        let Text = document.createTextNode(array[r*16+(i-1)]);
                        Create_Td.appendChild(Text);
                    }
                    Create_Tr.appendChild(Create_Td);
                }
            }else if(Mode == 4){ // BMI_Gender Table
                for(let i = 0; i<6; i++){
                    let Create_Td = document.createElement("td");
                    if(i == 0){
                        if(r == 0){
                            let Text = document.createTextNode("남성");
                            Create_Td.appendChild(Text);
                        }else{
                            let Text = document.createTextNode("여성");
                            Create_Td.appendChild(Text);
                        }
                    }else{
                        let Text = document.createTextNode(array[r*5+(i-1)]);
                        Create_Td.appendChild(Text);
                    }
                    Create_Tr.appendChild(Create_Td);
                }
            }
            r++;
        }
    }

    //Bring Data about Sex Ratio
    $.post(
        "Get_Sex_ratio.php",
        {
        },
        function(data){
            //Data JSON to array
            let Data = JSON.parse(data);
            let Man = parseInt(Data[0]); //Count of Man
            let Woman = parseInt(Data[1]); //Count of Woman
            let location = document.getElementById("SexChartCanvas"); //DOM location
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
            let a10 = parseInt(Data[0]); //20-30
            let a20 = parseInt(Data[1]); //30-40
            let a30 = parseInt(Data[2]); //40-50
            let a40 = parseInt(Data[3]); //50-60
            let a50 = parseInt(Data[4]); //60-70
            let a60 = parseInt(Data[5]); //70-80
            let a70 = parseInt(Data[6]); //over 80
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

    //Bring Data about height
    $.post(
        "GET_Height.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let case_1 = parseInt(Data[0]);
            let case_2 = parseInt(Data[1]);
            let case_3 = parseInt(Data[2]);
            let case_4 = parseInt(Data[3]);
            let case_5 = parseInt(Data[4]);
            let location = document.getElementById("Height");
            google.charts.load('current',{'packages':['corechart']});
            google.charts.setOnLoadCallback(function(){
                Create_Chart('참여자 신장', location, '140 이상 150 미만', case_1, '150이상 160 미만', case_2, '160 이상 170 미만', case_3, '170 이상 180 미만', case_4, '180 이상', case_5);
            })
        }
    )

    //Bring the number of people by disease
    $.post(
        "Get_Num_Disease.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let loc = document.getElementById("Result_disease_Num");
            CreateTable(loc, Data, 3);
        }
    )

    //Bring data about all disease
    $.post(
        "Get_All_Disease.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let loc1 = document.getElementById("Result_Part_1to8");
            let loc2 = document.getElementById("Result_Part_8to16");
            CreateTable(loc1, Data, 1);
            CreateTable(loc2, Data, 2);
        }
    )

    //Bring data about BMI_Gender
    $.post(
        "Get_BMI_Gender.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let loc = document.getElementById("Result_BMI_Gender");
            CreateTable(loc, Data, 4);
        }
    )

    $.post(
        "Get_Height_Gender.php",
        {},
        function(data){
            let Data = JSON.parse(data);
            let loc = document.getElementById("Result_Height_Gender");
            CreateTable(loc,Data,4);
        }
    )
})