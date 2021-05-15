d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/W08/task/data_8_1.csv")
    .then( data => {
      data.forEach( d => { d.value = +d.value;});
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:20, left:60}
        };
        console.log("ada");
        const barChart = new BarChart( config, data );
        barChart.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }


        init() {//描画領域の初期化
            let self = this;

            self.svg = d3.select( self.config.parent )
                .attr('width', self.config.width)
                .attr('height', self.config.height);

            self.chart = self.svg.append('g')
                .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

            self.area = d3.area()
                .x( d => d.x )
                .y1( d => d.y )
                .y0( 0 );

        }

        update() {
            let self = this;

            self.render();
        }

        render() {
            let self = this;

            self.svg.append('path')
                .attr('d', self.area(self.data))
                .attr('stroke', 'black')
                .attr('fill', 'black');

        }
}
