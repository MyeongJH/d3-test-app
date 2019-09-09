import React, { useState } from 'react';
import * as d3 from 'd3';
import './toJson.css';

function ToJson() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');

    function handleChangeA({ target }) {
        setA(target.value);
    }

    function handleChangeB({ target }) {
        setB(target.value);
    }

    function cvrtData() {
        console.log(d3.csvParse(a, d3.autoType));

        // setB(d3.csvParse(a, d3.autoType));
        // setB(a.replace('\t',','));
        let t = a.replace(/\t/gi, ',');
        t = d3.csvParse(t, d3.autoType);
        setB('[\n' + t.map(d => JSON.stringify(d) + '\n') + ']');
    }

    return (
        <div>
            <textarea value={a} onChange={handleChangeA} />
            <br />
            <button onClick={cvrtData}>ToJson </button>
            <br />
            <textarea value={b} onChange={handleChangeB} />
        </div>
    );
}

export default ToJson;
