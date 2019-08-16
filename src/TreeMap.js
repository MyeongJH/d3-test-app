import React, {Component} from 'react';
// eslint-disable-next-line
import TreeData from "./data/TreeMapData"
// eslint-disable-next-line
import TreeData2 from "./data/TreeMapData2"
import { uid } from "react-uid";
import * as d3 from "d3";

const w = 500 , h = 600
     ,color = d3.scaleOrdinal(d3.schemeCategory10)
     ,format = d3.format(",d")     
     ;

class TreeMap extends Component {
    componentDidMount() {
        // console.log(TreeData2);
        this.drawChart(TreeData);
    }

    dataTree = data => d3.treemap()
                         .size([w, h])
                         .padding(1)
                         .round(true)(
                             d3.hierarchy(data)
                            .sum(d => d.value)
                            .sort((a, b) => b.value - a.value));

    drawChart(data) {
        //const data = d3.json("https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json");
        const root = this.dataTree(data);
        // console.log(root);
        const svg = d3.select("#treeMap").append("svg")
                      .attr("viewBox", [0, 0, w, h])
                      .style("font", "7px D2Coding")
                      ;

        const leaf = svg.selectAll("g")
                        .data(root.leaves())
                        .join("g")
                        .attr("transform", d => `translate(${d.x0},${d.y0})`);
        
        leaf.append("title")
        .text(d => `${d.ancestors().reverse().map(d => d.data.name).join("/")}\n${format(d.value)}`);
  
        leaf.append("rect")
            .attr("id", d => (d.leafUid = uid("leaf")).id)
            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("fill-opacity", 0.6)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0);
    
        leaf.append("clipPath")
            .attr("id", d => (d.clipUid = uid("clip")).id)
            .append("use")
            .attr("xlink:href", d => d.leafUid.href);
    
        leaf.append("text")
            .attr("clip-path", d => d.clipUid)
            .selectAll("tspan")
            .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
            .join("tspan")
            .attr("x", 3)
            .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
            .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
            .text(d => d);
    }

    render() {
        return <div id="treeMap"></div>
    }
}

export default TreeMap;