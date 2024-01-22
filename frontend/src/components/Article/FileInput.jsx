
import AWS from 'aws-sdk';
import { useState } from "react";

function FileInput() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default FileInput;