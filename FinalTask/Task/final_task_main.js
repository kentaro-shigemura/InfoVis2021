let input_data;
let scatter_plot;
let bar_chart;
let filter = [];
var selectedlist = [];

d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/FinalTask/convini_data.csv")
.then( data => {
    input_data = data;
    input_data.forEach( d => {
        d.density = +d.density;
        d.seven = +d.seven;
        d.family = +d.family;
        d.Lawson = +d.Lawson;
    });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        bar_Chart = new BarChart2( {
            parent: '#drawing_region_barchart2',
            width: 500,
            height: 500,
            margin: {top:10, right:10, bottom:50, left:60},
        }, input_data );
        bar_Chart.update(filter);

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 500,
            height: 500,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Total number of convenience stores in Japan',
        }, input_data );
        bar_chart.update();

        d3.select('#reverse')
        .on('click', d => {
            data.reverse();
            bar_Chart.update(filter, data);
        });

        d3.select('#descend')
        .on('click', d => {
            data.sort(function(a, b) {
    if(a.density < b.density) return 1;
    if(a.density > b.density) return -1;
    return 0;
  });
  bar_Chart.update(filter, data);
});
        d3.select('#ascend')
        .on('click', d => {
            data.sort(function(a, b) {
      if(a.density < b.density) return -1;
      if(a.density > b.density) return 1;
      return 0;
      });
      bar_Chart.update(filter, data);
});

        d3.select('#back')
        .on('click', d => {
            data.sort(function(a, b) {
        if(a.number > b.number) return 1;
        if(a.number < b.number) return -1;
        return 0;
        });
            bar_Chart.update(filter, data);
      });

    })
    .catch( error => {
        console.log( error );
    });

function Filter(arrayData) {
    bar_Chart.update(arrayData);
}
