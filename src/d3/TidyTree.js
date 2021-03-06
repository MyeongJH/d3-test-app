import React, { Component } from 'react';
import * as d3 from "d3";
import TidyTreeData from "../data/FlareData";

const w = 932
    , data = d3.hierarchy(TidyTreeData);

class TidyTree extends Component {
    componentDidMount() {
        this.drawChart();
    }

    tree = data => {
        data.dx = 10;
        data.dy = w / (data.height + 1);
        return d3.tree().nodeSize([data.dx, data.dy])(data);
    }

    drawChart() {
        const root = this.tree(data);
        console.log(root);

        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });
        console.log(root);


        const svg = d3.select("#tidyTree").append("svg")
            .attr("viewBox", [0, 0, w, x1 - x0 + root.dx * 2]);

        const g = svg.append("g")
            .attr("font-family", "D2Coding")
            .attr("font-size", 10)
            .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

        g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));

        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke", "white");
    }

    render() {
        return <div id="tidyTree"></div>
    }
}

export default TidyTree;