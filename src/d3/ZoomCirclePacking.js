import React, { Component } from 'react';
import * as d3 from "d3";
import CircleData from "../data/FlareData";

const w = 932, h = 932;

class ZoomCirclePacking extends Component {
    componentDidMount() {
        this.drawChart();
    }

    pack = data => d3.pack()
        .size([w, h])
        .padding(3)(
            d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value))

    color = d3.scaleSequential([7, 0], d3.interpolateMagma);

    drawChart() {
        const root = this.pack(CircleData);
        let focus = root;
        let view;

        const svg = d3.select("#zoomCirclePacking").append("svg")
            .attr("viewBox", `-${w / 2} -${h / 2} ${w} ${h}`)
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("background", this.color(0))
            .style("cursor", "pointer")
            .on("click", () => zoom(root));

        const node = svg.append("g")
            .selectAll("circle")
            .data(root.descendants().slice(1))
            .join("circle")
            .attr("fill", d => d.children ? this.color(d.depth): "white")
            .attr("pointer-events", d => !d.children ? "none" : null)
            .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
            .on("mouseout", function () { d3.select(this).attr("stroke", null); })
            .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

        const label = svg.append("g")
            .style("font", "10px D2Conding")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .style("fill-opacity", d => d.parent === root ? 1 : 0.5)
            .style("display", d => d.parent === root ? "inline" : "inline")
            .text(d => d.data.name);

        zoomTo([root.x, root.y, root.r * 2]);

        function zoomTo(v) {
            const k = w / v[2];

            view = v;

            label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("r", d => d.r * k);
        }

        function zoom(d) {
            focus = d;

            const transition = svg.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                });

            label
                .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
                .transition(transition)
                .style("fill-opacity", d => d.parent === focus ? 1 : 0)
                .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
                .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
        }
    }

    render() {
        return <div id="zoomCirclePacking"></div>
    }
}

export default ZoomCirclePacking;