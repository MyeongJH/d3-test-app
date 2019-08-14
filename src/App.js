import React from 'react';
import UiTest from './UiTest';
import BarChart from './BarChart';
import TreeMap from './TreeMap';
import BubbleChart from './BubbleChart';
//import BubbleChart from './BubbleChart';

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

function App() {
  return (
    <div>
      {/* <FnTo/> */}
      {/* <UiTest /> */}
      {/* <BarChart /> */}
      <BubbleChart /> 
      <TreeMap />
    </div>
  );
}

export default App;
