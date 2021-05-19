d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/W10/task/data_8_2.csv")
    .then( data => {
      data.forEach( d => { d.value = +d.value;});
        var config = {
            parent: '#drawing_region',
            width: 900,
            height: 200,
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
        self.inner_height = self.config.height - self.config.margin.top - 2 * self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain([0, d3.max( self.data, d => d.value )])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map( d => d.label))
            .range( [0, self.inner_height] )
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        self.text_group = self.svg.append('g');


    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale( d.label ))
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth())
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
