import React, { Component } from 'react';
import { uid } from 'react-uid';
import * as d3 from 'd3';
import BubbleData from '../data/BubbleData';

const w = 932,
    h = 932,
    color = d3.scaleOrdinal(d3.schemeCategory10);

class BubbleChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    pack = data =>
        d3
            .pack()
            .size([w - 2, h - 2])
            .padding(3)(d3.hierarchy({ children: data }).sum(d => d.value));

    toData = data =>
        data.split('\n').map(d => ({
            name: d
                .split(',')[0]
                .split('.')
                .pop(),
            title: d.split(',')[0].replace(/\./g, '/'),
            group: d.split(',')[0].split('.')[1],
            value: +d.split(',')[1]
        }));

    toDataUseD3 = data =>
        d3.csvParse(data, d => ({
            name: d.id.split('.').pop(),
            title: d.id.replace(/\./g, '/'),
            group: d.id.split('.')[1],
            value: +d.value
        }));

    drawChart() {
        const data = this.toDataUseD3(BubbleData),
            format = d3.format(',d'),
            root = this.pack(data);

        // console.log(this.toData(BubbleData2));
        // console.log(this.toDataUseD3(BubbleData2));

        const svg = d3
            .select('#bubbleChart')
            .append('svg')
            .attr('viewBox', [0, 0, w, h])
            .attr('font-size', 10)
            .attr('font-family', 'D2Coding')
            .attr('text-anchor', 'middle');

        const leaf = svg
            .selectAll('g')
            .data(root.leaves())
            .join('g')
            .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);

        leaf.append('circle')
            .attr('id', d => (d.leafUid = uid('leaf')).id)
            .attr('r', d => d.r)
            .attr('fill-opacity', 0.7)
            .attr('fill', d => color(d.data.group));

        leaf.append('clipPath')
            .attr('id', d => (d.clipUid = uid('clip')).id)
            .append('use')
            .attr('xlink:href', d => d.leafUid.href);

        leaf.append('text')
            .attr('clip-path', d => d.clipUid)
            .selectAll('tspan')
            .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
            .join('tspan')
            .attr('x', 0)
            .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
            .text(d => d);

        leaf.append('title').text(d => `${d.data.title}\n${format(d.value)}`);
    }

    render() {
        return <div id="bubbleChart"></div>;
    }
}

export default BubbleChart;
