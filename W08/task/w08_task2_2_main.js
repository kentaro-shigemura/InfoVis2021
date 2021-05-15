d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/W06/data6.csv")
    .then( data => {
      data.forEach( d => { d.value = +d.value;});
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
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
            height: config.height || 256,
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

            self.xscale = d3.scaleLinear()
                .domain([0, d3.max( self.data, d => d.x ) + 5])
                .range( [0, self.inner_width] );

            self.yscale = d3.scaleLinear()
                .domain([d3.min( self.data, d => d.y ) - 5, d3.max( self.data, d => d.y ) + 5])
                .range( [self.inner_height , 0]);

            self.xaxis = d3.axisBottom( self.xscale )
                .ticks(5);

            self.yaxis = d3.axisLeft( self.yscale )
                    .ticks(5);


            self.xaxis_group = self.chart.append('g')
                    .attr('transform', `translate(0, ${self.inner_height})`);

            self.yaxis_group = self.chart.append('g')
                    .attr('transform', `translate(${self.inner_width}, 0 )`);

            self.text_group = self.svg.append('g');

            self.area = d3.area()
                .x( d => d.x )
                .y1( d => d.y )
                .y0( d3.max(self.data, d => d.y ) + 10 );

        }

        update() {
            let self = this;

            const xmin = d3.min( self.data, d => d.x );
            const xmax = d3.max( self.data, d => d.x );
            self.xscale.domain( [xmin, xmax] );

            const ymin = d3.min( self.data, d => d.y );
            const ymax = d3.max( self.data, d => d.y );
            self.yscale.domain( [ymin, ymax] );

            self.render();
        }

        render() {
            let self = this;

            self.xaxis_group
                .call( self.xaxis )
                .append("text")
                .attr("fill", "black")
                .attr("x", (self.inner_width) / 2 )
                .attr("y", 35)
                .attr("text-anchor", "middle")
                .attr("font-size", "10pt")
                .attr("font-weight", "middle")
                .text("month");

                self.xaxis_group
                    .call( self.xaxis )
                    .append("text")
                    .attr("fill", "black")
                    .attr("x", - (self.inner_height) / 2 )
                    .attr("y", - 35)
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(-90)")
                    .attr("font-size", "10pt")
                    .attr("font-weight", "middle")
                    .text("month");

          self.text_group
                .append("text")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("x", (self.inner_width ) / 2 )
                .attr("y", -30)
                .attr("font-weight", "middle")
                .attr("font-size", "10pt")
                .text("Monthly average temperature in Kobe");

           self.chart.selectAll("circle")
               .data(self.data)
               .enter()
               .append("circle")
               .attr("cx", d => self.xscale( d.x ) )
               .attr("cy", d => self.yscale( d.y ) )
               .attr("r", d => d.r );

            self.svg.append('path')
                .attr('d', self.area(self.data))
                .attr('stroke', 'black')
                .attr('fill', 'black');

        }
}
