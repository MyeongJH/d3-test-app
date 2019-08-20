import React, { useState } from 'react';
import axios from 'axios';

function UiTest() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  function handleChangeA(event) {
    setA(+event.target.value);
  }

  function handleChangeB(event) {
    setB(+event.target.value);
  }

  return (
    <div>
      <input type="number" value={a} onChange={handleChangeA}/><br></br>
      <input type="number" value={b} onChange={handleChangeB}/>

      <p>{a} + {b} = {a + b}</p>

      <ReTest />
    </div>
  );
};

class ReTest extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {data:{data:{movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    console.log(movies);
    this.setState({movies, isLoading: false});
  }

  componentDidMount() {
    this.getMovies();
  }
  
  render() {
    const {isLoading} = this.state;
    return <div>{isLoading? "Loding": "Ready"}</div>
  }
}

export default UiTest;