import React, { Component } from 'react';
import { uid } from "react-uid";
import * as d3 from "d3";
import CircleData from "./data/CircleData";

const w = 975, h = 975
    , color = d3.scaleSequential([8, 0], d3.interpolateMagma)
    , format = d3.format(",d")
    ;
let focus, view;

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
        focus = root;

        const svg = d3.select("#circlePacking").append("svg")
            .attr("viewBox", `-${w / 2} -${h / 2} ${w} ${h}`)
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("font", "10px D2Coding")
            .style("cursor", "pointer")
            .attr("text-anchor", "middle")
            .on("click", () => zoom(root))
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
            //.data(root.descendants().slice(1))
            .join("g")
            .attr("filter", shadow)
            .selectAll("g")
            .data(d => d.values)
            .join("g")
            .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
            // .attr("pointer-events", d => !d.children ? "none" : null)
            .on("mouseover", function () { d3.select(this).attr("stroke", "black"); })
            .on("mouseout", function () { d3.select(this).attr("stroke", null); })
            .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));;

        node.append("circle")
            .attr("r", d => d.r)
            .attr("fill", d => color(d.height));

        const leaf = node.filter(d => !d.children);

        // leaf.select("circle")
        //     .attr("id", d => (d.leafUid = uid("leaf")).id);

        // leaf.append("clipPath")
        //     .attr("id", d => (d.clipUid = uid("clip")).id)
        //     .append("use")
        //     .attr("xlink:href", d => d.leafUid.href);

        const label = leaf.append("text")
            .attr("clip-path", d => d.clipUid)
            .selectAll("tspan")
            .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
            .text(d => d)
            ;

        node.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

        zoomTo([root.x, root.y, root.r * 2]);

        function zoomTo(v) {
            const k = w / v[2];
            view = v;

            label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("r", d => d.r * k);
        }

        function zoom(d) {
            const focus0 = focus;
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
        return <div id="circlePacking"></div>
    }
}

export default CirclePacking;