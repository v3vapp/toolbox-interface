import Papa from 'papaparse';
import React from 'react';

class App extends React.Component {
  handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const jsonData = results.data;
        //fetch apiを使ってjsonデータをpost
        fetch('http://127.0.0.1:8000/upload/', {
          method: 'POST',
          body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
      }
    });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
      </div>
    );
  }
}

export default App;
