let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

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
            xlabel: 'Species',
        }, input_data );
        bar_Chart.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 500,
            height: 500,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Coveniencestore',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    bar_Chart.update(filter);
}
