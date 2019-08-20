import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UiTest from './UiTest';
import BarChart from './BarChart';
import TreeMap from './TreeMap';
import BubbleChart from './BubbleChart';
import TidyTree from './TidyTree';
import CirclePacking from './CirclePacking';
import ZoomCirclePacking from './ZoomCirclePacking'
import Matrix from './Matrix';
import HierarchiBar from './HierarchiBar';

const baseUrl = '/d3-test-app/';
const arr = [
  {no : 1, ko : 'ㄱ', en : 'a'}
  ,{no : 2, ko : 'ㄴ', en : 'b'}
  ,{no : 3, ko : 'ㄷ', en : 'c'}
  ,{no : 4, ko : 'ㄹ', en : 'd'}
  ,{no : 5, ko : 'ㅁ', en : 'e'}
];

function FnArr({no, ko}) {
  return <h3>no : {no}, ko : {ko}</h3>
}

function FnTo() {
  return (
    <div>
      {arr.map((d,i) => (<FnArr no={d.no} ko={d.ko} key={i} />))}
      <UiTest />
    </div>
  )
}

function App() {
  return (
    <Router>
      <ul>
        <li><Link to={baseUrl}>Home</Link></li>
        <li><Link to={baseUrl+"BarChart"}>BarChart</Link></li>
        <li><Link to={baseUrl+"BubbleChart"}>BubbleChart</Link></li>
        <li><Link to={baseUrl+"TreeMap"}>TreeMap</Link></li>
        <li><Link to={baseUrl+"TidyTree"}>TidyTree</Link></li>
        <li><Link to={baseUrl+"CirclePacking"}>CirclePacking</Link></li>
        <li><Link to={baseUrl+"ZoomCirclePacking"}>ZoomCirclePacking</Link></li>
        <li><Link to={baseUrl+"Matrix"}>Matrix</Link></li>
        <li><Link to={baseUrl+"HierarchiBar"}>HierarchiBar</Link></li>
      </ul>

      <Route exact path={baseUrl} render={()=><FnTo />} />
      <Route path={baseUrl+"BarChart"} render={()=><BarChart />} />
      <Route path={baseUrl+"BubbleChart"} render={()=><BubbleChart />} />
      <Route path={baseUrl+"TreeMap"} render={()=><TreeMap />} />
      <Route path={baseUrl+"TidyTree"} render={()=><TidyTree />} />
      <Route path={baseUrl+"CirclePacking"} render={()=><CirclePacking />} />
      <Route path={baseUrl+"ZoomCirclePacking"} render={()=><ZoomCirclePacking />} />
      <Route path={baseUrl+"Matrix"} render={()=><Matrix />} />
      <Route path={baseUrl+"HierarchiBar"} render={()=><HierarchiBar />} />
    </Router>
  );
}

export default App;