d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/W10/task/data6.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:40, right:40, bottom:50, left:50}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:40, right:40, bottom:50, left:50}
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
        self.inner_width2 = self.config.margin.left + self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate( 0 , 0 )`);

        self.text_group = self.svg.append('g');
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x ) - 1;
        const xmax = d3.max( self.data, d => d.x ) + 1;
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y ) - 5;
        const ymax = d3.max( self.data, d => d.y ) + 5;
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .join('circle')
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r )
            .on('mouseover', (e,d) => {
            d3.select('#tooltip')
              .style('opacity', 1)
              .html(`<div class="tooltip-label">(month,tempalture)</div>(${d.x}, ${d.y})`);
      })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                    .style('left', (e.pageX + padding) + 'px')
                    .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', () => {
                d3.select('#tooltip')
                    .style('opacity', 0);
            });

        self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", (self.config.width  ) / 3 )
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "middle")
            .text("month");

        self.yaxis_group
            .call( self.yaxis )
            .append("text")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("x", -(self.config.width  ) / 3 )
            .attr("y", -35)
            .attr("transform", "rotate(-90)")
            .attr("font-weight", "middle")
            .attr("font-size", "10pt")
            .text("temperature");


        self.text_group
             .append("text")
             .attr("fill", "black")
             .attr("text-anchor", "middle")
             .attr("x", (self.config.width ) / 2 )
             .attr("y", 30)
             .attr("font-weight", "middle")
             .attr("font-size", "10pt")
             .text("Monthly average temperature in Kobe");

    }
}
