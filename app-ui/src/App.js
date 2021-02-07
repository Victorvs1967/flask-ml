import React, { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  const [ allImages, setAllImages ] = useState([]);

  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => setAllImages(data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/api/index"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to API
        </a>
      </header>
        <table style={{padding: "20px"}}>
          <tbody>
          {allImages.map(item => <tr style={{textAlign: "left", marginLeft: '10px'}} key={item._id.$oid}><td>{ item.file_name }</td><td>{ item.prediction }</td></tr>)}
          </tbody>
        </table>
    </div>
  );
};

export default App;
