import React, { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  const [ allImages, setAllImages ] = useState([]);

  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => setAllImages(data))
  }, [])

  const tableStyle = {textAlign: "left", marginLeft: '10px'};
  const tableBody = allImages.map(
        item => <tr style={ tableStyle } key={item._id.$oid}>
                  <td style={{padding: 8}}>{ item.file_name }</td>
                  <td style={{paddingLeft: 10}}>{ item.prediction }</td>
                </tr>);

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
        <table border="1" style={{margin: "auto", marginTop: 20}}>
          <thead style={ tableStyle }>
            <tr>
              <td style={{padding: 8}}><strong>IMAGE NAME</strong></td>
              <td style={{padding: 8}}><strong>PREDICTION</strong></td>
            </tr>
          </thead>
          <tbody>{ tableBody }</tbody>
        </table>
    </div>
  );
};

export default App;
