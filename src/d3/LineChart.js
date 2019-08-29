import React, { Component } from 'react';
import * as d3 from 'd3';
import LineData from '../data/LineData';

class LineChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    toData = data =>
        d3.csvParse(data, d => ({
            data,
            value: d.close
        }));

    drawChart() {
        console.log(this.toData(LineData));
    }

    render() {
        return <div id="lineChart"></div>;
    }
}

export default LineChart;
