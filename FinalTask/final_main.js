let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/FinalTask/convi_number.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.value = +d.value;
        });

        bar_Chart = new BarChart1_2( {
            parent: '#drawing_region_barchart1_2',
            width: 1000,
            height: 300,
            margin: {top:10, right:10, bottom:60, left:60},
            xlabel: 'Species',
        }, input_data );
        bar_Chart.update();

      });

d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/FinalTask/convini_data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.density = +d.density;
            d.seven = +d.seven;
            d.family = +d.family;
            d.Lawson = +d.Lawson;
        });

        bar_Chart = new BarChart2( {
            parent: '#drawing_region_barchart2',
            width: 1000,
            height: 1000,
            margin: {top:10, right:10, bottom:50, left:60},
            xlabel: 'Species',
        }, input_data );
        bar_Chart.update();

        d3.select('#reverse')
        .on('click', d => {
            data.reverse();
            bar_Chart.update(data);
        });

        d3.select('#descend')
        .on('click', d => {
            data.sort(function(a, b) {
    if(a.density < b.density) return 1;
    if(a.density > b.density) return -1;
    return 0;
  });
  bar_Chart.update(data);
});
        d3.select('#ascend')
        .on('click', d => {
            data.sort(function(a, b) {
      if(a.density < b.density) return -1;
      if(a.density > b.density) return 1;
      return 0;
      });
      bar_Chart.update(data);
});

        d3.select('#back')
        .on('click', d => {
            data.sort(function(a, b) {
        if(a.number > b.number) return 1;
        if(a.number < b.number) return -1;
        return 0;
        });
            bar_Chart.update(data);
      });


    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.species ) );
    }
    scatter_plot.update();
}
