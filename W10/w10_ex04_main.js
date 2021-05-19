var svg = d3.select('#drawing_region')

svg.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 50)
    .attr('fill', 'steelblue')
    .transition()//後の状態にかえる
    .duration(800) // 3 secかけて色を変える
    .attr('fill', 'salmon');
