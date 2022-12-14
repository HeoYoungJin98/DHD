$(document).ready(function(){
    Get_Rate(1)
    Get_Rate_Gender(1)
    Get_Rate_Age(1)
    Get_nutrition(1);
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
            Get_nutrition(1);
        }else{
            $("#Osteoporosis_Charts").css('display','');
            $("#Arthritis_Charts").css('display','none');
            Get_Rate(2)
            Get_Rate_Gender(2)
            Get_Rate_Age(2)
            Get_nutrition(2)
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
                        Create_Chart('????????? ?????? ?????? ??????(?????????)',location, '?????????', Arthritis[0], '??????', Arthritis[1], '??????', Arthritis[2], '?????? ?????? ?????? ??????', Arthritis[3]);
                        Create_Bar_Chart('????????? ?????? ?????? ??????(??????: %)', location_Bar, '????????? ????????? ?????? ??????', avg(Arthritis[2],Sum), '?????? ????????? ?????? ??????', Percent_All);
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
                        Create_Chart('???????????? ?????? ?????? ??????(?????????)',location, '??????, ?????????', Osteoporosis[3], '??????', Osteoporosis[0], '??????', Osteoporosis[1], '?????????', Osteoporosis[2]);
                        Create_Bar_Chart('???????????? ?????? ?????? ??????(??????: %)', location_Bar, '????????? ???????????? ?????? ??????', avg(Osteoporosis[1],Sum), '?????? ???????????? ?????? ??????', Percent_All);
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
                        Create_Chart('????????? ?????? ??????(??????: ???)', location, '??????', Arthritis[0], '??????', Arthritis[1]);
                        Create_Bar_Chart('????????? ?????? ?????? ??????(??????: %)', location_Bar, '????????? ??????', avg(Arthritis[0],Sum), '?????? ??????', avg(Man_All,All),'????????? ??????', avg(Arthritis[1],Sum), '?????? ??????', avg(Woman_All,All));
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
                        Create_Chart('???????????? ?????? ??????(??????: ???)', location, '??????', Osteoporosis[0], '??????', Osteoporosis[1]);
                        Create_Bar_Chart('???????????? ?????? ?????? ??????(??????: %)', location_Bar, '????????? ??????', avg(Osteoporosis[0],Sum), '?????? ??????', avg(Man_All,All),'????????? ??????', avg(Osteoporosis[1],Sum), '?????? ??????', avg(Woman_All,All));
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
                        Create_Chart('????????? ????????? ?????? ???(??????: ???)', location_Pie, '20???', Arthritis[0], '30???', Arthritis[1], '40???', Arthritis[2], '50???', Arthritis[3], '60???', Arthritis[4], '70???', Arthritis[5], '80??? ??????', Arthritis[6]);
                        Create_Bar_Chart('????????? ????????? ?????? ?????? ??????(??????: %)', location_Bar, '????????? 20???', 0, '?????? 20???', Ar_All[0], '????????? 30???', rate[0], '?????? 30???', Ar_All[1], '????????? 40???', rate[1], '?????? 40???', Ar_All[2], '????????? 50???', rate[2], '?????? 50???', Ar_All[3], '????????? 60???', rate[3], '?????? 60???', Ar_All[4], '????????? 70???', rate[4], '?????? 70???', Ar_All[5], '????????? 80??? ??????', rate[5], '?????? 80??? ??????', Ar_All[6]);
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
                        Create_Chart('????????? ???????????? ?????? ???(??????: ???)', location_Pie, '50???', Osteoporosis[0], '60???', Osteoporosis[1], '70???', Osteoporosis[2], '80??? ??????', Osteoporosis[3]);
                        Create_Bar_Chart('????????? ???????????? ?????? ?????? ??????(??????: %)', location_Bar, '????????? 30???', 0, '?????? 30???', Os_All[0], '????????? 40???', 0, '?????? 40???', Os_All[1], '????????? 50???', rate[0], '?????? 50???', Os_All[2], '????????? 60???', rate[1], '?????? 60???', Os_All[3], '????????? 70???', rate[2], '?????? 70???', Os_All[4], '????????? 80??? ??????', rate[3], '?????? 80??? ??????', Os_All[5]);
                    })
                }
            }
        )
    }

    function Get_nutrition(Code){
        var loc_head;
        var loc_body;
        $.post("Get_nutrition.php", {Code: Code})
        .done(function(data){
            if(Code == 1){//Arthritis
                loc_head = document.getElementById("Ar_nutrition_Head");
                loc_body = document.getElementById("Ar_nutrition_Body");
            }else{
                loc_head = document.getElementById("Os_nutrition_Head");
                loc_body = document.getElementById("Os_nutrition_Body");
            }
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