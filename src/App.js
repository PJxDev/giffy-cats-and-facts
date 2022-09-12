import { useState } from 'react';
import './App.css';

const catAPI = 'https://catfact.ninja/fact'


function App() {
  const [fact, setFact] = useState("");
  
  fetch(catAPI)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.fact)
    })

  return (
    <div className="App">
      <h1>Hola Mundo</h1>
    </div>
  );
}

export default App;
