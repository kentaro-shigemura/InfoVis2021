d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        // Convert strings to numbers
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        ShowScatterPlot(data);
    })
    .catch( error => {
        console.log( error );
    });

function ShowScatterPlot( data ) {
    const width = 256;
    const height = 256;
    const margin = {top: 20, right: 20, bottom: 20, left: 25};
    var svg = d3.select("body").append("svg")
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var xscale = d3.scaleLinear()
        .domain( [d3.min(data, d => d.x) -20, d3.max(data, d => d.x) + 20])
        .range( [0, width - margin.left - margin.right ] );

    var yscale = d3.scaleLinear()
        .domain( [d3.min(data, d => d.y) - 20, d3.max(data, d => d.y + 20)] )
        .range( [0, height - margin.top - margin.bottom] );

    var xaxis = d3.axisBottom( xscale )
        .ticks(8);

    var yaxis = d3.axisLeft( yscale )
        .ticks(8);

    svg.append('g')
        .attr('transform', "translate(" + 0 + "," + (height - margin.bottom - margin.top) + ")")
        .call( xaxis );

    svg.append('g')
        .attr('transform', "translate(" + width - margin.left - margin.right +"," + 0 +")")
        .call( yaxis );


    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xscale(d.x))
        .attr("cy", d => yscale(d.y))
        .attr("r", d => d.r);
};
