import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = event => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.file_data);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">Sort CSV</button>
      </form>
    </div>
  );
};

export default App;
