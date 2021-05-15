d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/W08/task/data_8_2.csv")
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
            radius: config.radius || Math.min( config.width, config.height ) / 2,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {//描画領域の初期化
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

            self.pie = d3.pie()
                .value( d => d.value );

            self.arc = d3.arc()
                  .innerRadius(self.config.radius/2)
                  .outerRadius(self.config.radius);

    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()
            .append('path')
            .attr('d', self.arc)
            .attr('fill', d => d.color )
            .attr('stroke', 'white')
            .style('stroke-width', '2px');
    }
}
