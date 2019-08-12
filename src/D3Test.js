import React from 'react';
import * as d3 from "d3";

function D3Test() {
    const data = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    const svg = d3.select('svg');

    data.forEach((d,i) => {
        svg.append('rect')
           .attr('height', data[i])
           .attr('width',40)
           .attr('x', 50 * i)
           .attr('y', 100 - data[i])
    })

    return (
        <svg width='500' height='500'></svg>
    )
};

export default D3Test;