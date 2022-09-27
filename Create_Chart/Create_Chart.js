function Create_Chart(){
    //change arguments to array
    const array = Array.prototype.slice.call(arguments);
    let loc = array[1];

    var data = new google.visualization.DataTable();
    //addColumn('Type','Data')
    data.addColumn('string','Category');
    data.addColumn('number','Value');

    chart_data = [];
    
    //push datas into chart_data array
    for(let i = 0; i<array.length; i+=2){
        if((i != 0)){
            chart_data.push([array[i], array[i+1]]);
        }
    }

    data.addRows(chart_data);

    //options(chart name, size)
    var options = {
        'title': array[0],
        'width': 600,
        'height': 250
    };

    var chart = new google.visualization.PieChart(loc);
    chart.draw(data, options);
}