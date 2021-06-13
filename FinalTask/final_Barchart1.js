class BarChart1 {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 2000,
            height: config.height || 1000,
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
        self.inner_height = self.config.height - self.config.margin.top - 2 * self.config.margin.bottom;

        self.xscale = d3.scaleBand()
            .range( [0, self.inner_width] )
            .paddingInner(0.1);

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        self.text_group = self.svg.append('g');


    }

    update() {
        let self = this;
        const ymin = 0;
        const ymax = d3.max( self.data, d => d.value )
        self.yscale.domain( [ymin, ymax] );
        self.xscale.domain(self.data.map( d => d.store))
        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .join('rect')
            .transition().duration(1000)
            .attr("fill", "orange")
            .attr("x", d => self.xscale( d.store ))
            .attr("y", 0)
            .attr("width", self.xscale.bandwidth())
            .attr("height", d => self.yscale(d.value))
            .style("fill", d => d.color);


        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );

       self.text_group
            .append("text")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("x", (self.config.width / 2) )
            .attr("y",  self.config.height - 5)
            .attr("font-weight", "middle")
            .attr("font-size", "10pt")
            .text("Number of people infected with COVID19 on May 16.");
    }
}
