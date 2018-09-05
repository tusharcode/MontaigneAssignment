function lineChart(chartData) {

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawLineColors);


    function drawLineColors() {
          let data = new google.visualization.DataTable();
          data.addColumn('date', 'Date');

          let keywords = [];

          for (key in chartData) {
            keywords.push(key);
          }

          for(let i = keywords.length-1; i>=0; i--) {
            data.addColumn('number', keywords[i]);
          }

          let cartPoints="";

          let first = [], second =[], third=[], fourth=[], fifth=[], sixth=[], seventh=[];
          
          for(let index = 0; index < 7; index++) {
            for( keys in chartData) {
              if (index ==0 ) {
                first.push(chartData[keys].points[index]);
              }
              if (index ==1 ) {
                second.push(chartData[keys].points[index]);
              }
              if (index ==2 ) {
                third.push(chartData[keys].points[index]);
              }
              if (index ==3 ) {
                fourth.push(chartData[keys].points[index]);
              }
              if (index ==4 ) {
                fifth.push(chartData[keys].points[index]);
              }
              if (index ==5 ) {
                sixth.push(chartData[keys].points[index]);
              }
              if (index ==6 ) {
                seventh.push(chartData[keys].points[index]);
              }
            }
          }


          data.addRows([
              [new Date("2018, 08, 24"), first[0],first[1],first[2],first[3],first[4] ],
              [new Date("2018, 08, 25"), second[0],second[1],second[2],second[3],second[4]],
              [new Date("2018, 08, 26"), third[0],third[1],third[2],third[3],third[4]],
              [new Date("2018, 08, 27"), fourth[0],fourth[1],fourth[2],fourth[3],fourth[4]],
              [new Date("2018, 08, 28"), fifth[0],fifth[1],fifth[2],fifth[3],fifth[4]],
              [new Date("2018, 08, 29"), sixth[0],sixth[1],sixth[2],sixth[3],sixth[4]],
              [new Date("2018, 08, 30"), seventh[0],seventh[1],seventh[2],seventh[3],seventh[4]]
            ]);

          let options = {
            curveType: 'function',
            legend: { position: 'bottom' },
            legendTextStyle: {color:'white'},
            vAxis : {ticks:[1,2,3,4,5,6,7,8,9], textStyle:{color: '#5e5e5e'}},
            hAxis: {format: 'yyyy-MM-dd', textStyle:{color: '#5e5e5e'} },
            pointSize: 8,
            backgroundColor: '#363636',
            colors: ['#517d52', '#756074', '#a59fef', '#5ab53c', '#56bc81' ],
            chartArea: { left : 50, right : 50, top:30, width:"90%"},
            cssClassNames : {'tableCell': 'custom-table-td'}
          };

          let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
          chart.draw(data, options);
    }


    $(window).resize(function(){
      drawLineColors();
    });

}

// AJAX Call for redering Chart Data

function loadChartData() {
  $('#loader1').show();
  $('#curve_chart').hide();
  $.ajax({
    url : "http://api.jsonbin.io/b/5b893b00db948c68635a04eb",
    dataType : "json",
    type : "GET",
    success : function(chartData) {
      lineChart(chartData);
    },
    complete:function(data){
      $("#loader1").hide();
      $('#curve_chart').show();
     }
  });
}

// AJAX Call for rendering data to Datatable
function loadTableData() {
  $('#loader2').show();
  $('#tableDiv').hide();
  $.ajax({
      url : "http://api.jsonbin.io/b/5b893aa03ffac56f4bd7905a",
      type : "GET",
      dataType: "json",
      success : function(tableData) {
        rowCount = tableData.data.length;

        for (let i = 0; i < rowCount; i++) {
          rankTable.row.add( [ tableData.data[i].keyword, tableData.data[i].position, tableData.data[i].change ]).draw();
        }
      },
      complete:function(data){
        $("#loader2").hide();
        $('#tableDiv').show();
       }
    });
}