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
        <form action="/predict" method="POST" encType="multipart/form-data">
          <div className="form-group mt-5">
            <input className="form-control-file" type="file" name="file" />
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </div>
        </form>
    </header>
      <table border="1" frame="void" rules="rows" style={{margin: "auto", marginTop: 20}}>
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
