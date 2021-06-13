class BarChart2 {
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

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
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
        const xmin = 0;
        const xmax = d3.max( self.data, d => d.seven )
        self.xscale.domain( [xmin, xmax] );
        self.yscale.domain(self.data.map( d => d.Prefectures))
        self.render();
    }

    render() {
        let self = this;
        self.chart.selectAll("rect#a")
            .data(self.data)
            .join('rect')
            .transition().duration(1000)
            .attr("fill", "orange")
            .attr("x", 0)
            .attr("y", d => self.yscale( d.Prefectures ))
            .attr("width", d => self.xscale(d.seven))
            .attr("height", self.yscale.bandwidth()/3)
            .attr('id', 'a');;

        self.chart.selectAll("rect#b")
                .data(self.data)
                .join('rect')
                .transition().duration(1000)
                .attr("fill", "green")
                .attr("x", 0)
                .attr("y", d => self.yscale( d.Prefectures ) + self.yscale.bandwidth()/3)
                .attr("width", d => self.xscale(d.family))
                .attr("height", self.yscale.bandwidth()/3)
                .attr('id', 'b');


        self.chart.selectAll("rect#c")
                    .data(self.data)
                    .join('rect')
                    .transition().duration(1000)
                    .attr("fill", "blue")
                    .attr("x", 0)
                    .attr("y", d => self.yscale( d.Prefectures ) + 2*self.yscale.bandwidth()/3)
                    .attr("width", d => self.xscale(d.Lawson))
                    .attr("height", self.yscale.bandwidth()/3)
                    .attr('id', 'c');;

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
            .text("Number of conveniencestore in 2020.");
    }
}
