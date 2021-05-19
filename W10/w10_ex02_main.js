var svg = d3.select('#drawing_region');

UpdateChart( [5, 10, 15] );
UpdateChart( [20, 40] );

function UpdateChart( data ) {
    svg.selectAll('circle')
        .data( data )
        .join('circle')//3つの操作を同時にしてくれる(enter,update,exit)
        .attr('fill', 'steelblue')
        .attr('r', d => d)
        .attr('cx', (d,index) => (index * 80) + 50)
        .attr('cy', 80);
}
