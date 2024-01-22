
// import AWS from 'aws-sdk';
import { useState } from "react";

import "./FileInput.css";

function FileInput() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
        const S3_BUCKET = "bucket-name";
        const REGION = "region";

        AWS.config.update({
        accessKeyId: "youraccesskeyhere",
        secretAccessKey: "yoursecretaccesskeyhere",
        });
        const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
        });

        const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
        };

        var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
            console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
            );
        })
        .promise();

        await upload.then((err, data) => {
        console.log(err);
        alert("File uploaded successfully.");
        });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="fInput">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default FileInput;