import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    componentDidMount() {
      this.drawChart();
    }
      
    drawChart() {
      const data = [0.5, 0.7,1,2,3,4,5,6,7,8,9,9,10]
            ,h = 200 , w = 700
            ,svg = d3.select("#barCart").append("svg").attr("width", w).attr("height", h);

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => h - 15 * d)
        .attr("width", 25)
        .attr("height", (d, i) => d * 15)
        .attr("fill", "skyblue")
        .style("hover","black");

      svg.selectAll("text")
         .data(data)
         .enter()
         .append("text")
         .text(d => d)
         .attr("x", (d, i) => i * 40)
         .attr("y",(d, i) => h - 15 * d);
    }
          
    render(){
      return <div id="barCart"></div> 
    }
  }
      
  export default BarChart;