import React from 'react';
import UiTest from './UiTest';
//import D3Test from './D3Test';
import BarChart from './BarChart';

function FnArr({no, ko}) {
  console.log(ko,no);
  return <h3>no {no} ko {ko}</h3>
}

const arr = [
  {no : 1, ko : 'ㄱ', en : 'a'}
  ,{no : 2, ko : 'ㄴ', en : 'b'}
  ,{no : 3, ko : 'ㄷ', en : 'c'}
  ,{no : 4, ko : 'ㄹ', en : 'd'}
  ,{no : 5, ko : 'ㅁ', en : 'e'}
];

function App() {
  return (
    <div>
      {arr.map( i => (
        <FnArr no={i.no} ko={i.ko} />
      ))}
      <UiTest />
      <BarChart />
    </div>
  );
}

export default App;
