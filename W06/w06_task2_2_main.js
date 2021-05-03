d3.csv("https://kentaro-shigemura.github.io/InfoVis2021/W06/data6.csv")
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
    const margin = {top: 40, right: 40, bottom: 50, left: 50};
    var svg = d3.select("body").append("svg")
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var xscale = d3.scaleLinear()
        .domain( [d3.min(data, d => d.x) - 1 , d3.max(data, d => d.x) + 1])
        .range( [0, width - margin.left - margin.right ] );

    var yscale = d3.scaleLinear()
        .domain( [d3.min(data, d => d.y) - 5 , d3.max(data, d => d.y) + 5] )
        .range( [height - margin.top - margin.bottom, 0] );

    var xaxis = d3.axisBottom( xscale )
        .ticks(6);

    var yaxis = d3.axisLeft( yscale )
        .ticks(6);

    svg.append('g')
        .attr('transform', "translate(" + 0 + "," + (height - margin.bottom - margin.top) + ")")
        .call( xaxis )
        .append("text")
        .attr("fill", "black")
        .attr("x", (width - margin.left - margin.right ) / 2 )
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("font-size", "10pt")
        .attr("font-weight", "middle")
        .text("month");

    svg.append('g')
        .attr('transform', "translate(" + width - margin.left - margin.right +"," + 0 +")")
        .call( yaxis )
        .append("text")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("x", -(height - margin.top - margin.bottom) / 2 )
        .attr("y", -35)
        .attr("transform", "rotate(-90)")
        .attr("font-weight", "middle")
        .attr("font-size", "10pt")
        .text("temperature[Ž]");

        svg.append('g')
            .append("text")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("x", (width - margin.left - margin.right ) / 2 )
            .attr("y", -30)
            .attr("font-weight", "middle")
            .attr("font-size", "10pt")
            .text("Monthly average temperature in Kobe");

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xscale(d.x))
        .attr("cy", d => yscale(d.y))
        .attr("r", d => d.r);
};
