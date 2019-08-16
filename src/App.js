import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UiTest from './UiTest';
import BarChart from './BarChart';
import TreeMap from './TreeMap';
import BubbleChart from './BubbleChart';
import TidyTree from './TidyTree';
import CirclePacking from './CirclePacking';

const arr = [
  {no : 1, ko : 'ㄱ', en : 'a'}
  ,{no : 2, ko : 'ㄴ', en : 'b'}
  ,{no : 3, ko : 'ㄷ', en : 'c'}
  ,{no : 4, ko : 'ㄹ', en : 'd'}
  ,{no : 5, ko : 'ㅁ', en : 'e'}
];

function FnArr({no, ko}) {
  // console.log(ko,no);
  return <h3>no {no} ko {ko}</h3>
}

function FnTo() {  
  return (arr.map( i => (
    <FnArr no={i.no} ko={i.ko} />
    )))
}

function ToBarChart() {
  return <BarChart />
}

function ToBubbleChart() {
  return <BubbleChart />
}

function ToTreeMap() {
  return <TreeMap />
}

function ToTidyTree() {
  return <TidyTree />
}

function ToCirclePacking() {
  return <CirclePacking />
}

function App() {
  return (
    <Router>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/BarChart">BarChart</Link></li>
        <li><Link to="/BubbleChart">BubbleChart</Link></li>
        <li><Link to="/TreeMap">TreeMap</Link></li>
        <li><Link to="/TidyTree">TidyTree</Link></li>
        <li><Link to="/CirclePacking">CirclePacking</Link></li>
      </ul>

      <Route exact path="/" component={FnTo} />
      <Route path="/BarChart" component={ToBarChart} />
      <Route path="/BubbleChart" component={ToBubbleChart} />
      <Route path="/TreeMap" component={ToTreeMap} />
      <Route path="/TidyTree" component={ToTidyTree} />
      <Route path="/CirclePacking" component={ToCirclePacking} />
    </Router>
  );
}

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         {/* <FnTo/> */}
//         {/* <UiTest /> */}        
//         <BarChart />
//         <BubbleChart /> 
//         <TreeMap />
//         <TidyTree />
//       </div>
//     )
//   };
// }

export default App;
