import React, { Component } from 'react';
import { uid } from "react-uid";
import * as d3 from "d3";
import CircleData from "./data/FlareData";

const w = 975, h = 975
    , color = d3.scaleSequential([8, 0], d3.interpolateMagma)
    , format = d3.format(",d");

class CirclePacking extends Component {
    componentDidMount() {
        this.drawChart();
    }

    pack = data => d3.pack()
        .size([w - 2, h - 2])
        .padding(3)(
            d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value))

    drawChart() {
        const root = this.pack(CircleData);
        const svg = d3.select("#circlePacking").append("svg")
            .attr("viewBox", [0, 0, w, h])
            .style("font", "10px sans-serif")
            .attr("text-anchor", "middle");
        ;
        const shadow = uid("shadow");

        svg.append("filter")
            .attr("id", shadow.id)
            .append("feDropShadow")
            .attr("flood-opacity", 0.3)
            .attr("dx", 0)
            .attr("dy", 1);

        const node = svg.selectAll("g")
            .data(d3.nest().key(d => d.height).entries(root.descendants()))
            .join("g")
            .attr("filter", shadow)
            .selectAll("g")
            .data(d => d.values)
            .join("g")
            .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

        node.append("circle")
            .attr("r", d => d.r)
            .attr("fill", d => color(d.height));

        const leaf = node.filter(d => !d.children);

        leaf.select("circle")
            .attr("id", d => (d.leafUid = uid("leaf")).id);

        leaf.append("clipPath")
            .attr("id", d => (d.clipUid = uid("clip")).id)
            .append("use")
            .attr("xlink:href", d => d.leafUid.href);

        leaf.append("text")
            .attr("clip-path", d => d.clipUid)
            .selectAll("tspan")
            .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
            .text(d => d);

        node.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
    }

    render() {
        return <div id="circlePacking"></div>
    }
}

export default CirclePacking;