import React, { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import Output from "./Output";


export let api_fetch_data = {};

export const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [selectedDate, setSelectedDate] = useState(null); // ?? use cases
  const [showOutput, setShowOutput] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);

  const handleQuery = async () => {
    // Get the file, date, and time from the form
    const fileInput = document.getElementById("fileInput");
    const date = document.getElementById("dateInput").value;

    // Create a formdata
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("date", date);

    const response = await fetch("http://127.0.0.1:5000/test", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        api_fetch_data = data;
        setApiResponse(true);
      })
      .catch((error) => console.error("Error: ", error));
    
    // for console logging the api response
    console.log(api_fetch_data);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    handleQuery();
    setShowOutput(true);
  };
  if (showOutput && apiResponse) {
    return (
      <Output x_data={api_fetch_data.users} y_data={api_fetch_data.counts} />
    );
  }

  return (
    <main>
      <div className="FileUploader">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            id="fileInput"
            accept=".txt, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="input-field"
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
              if (files) {
                setFile(URL.createObjectURL(files[0]));
              }
            }}
          />
          <div
            className="upload_img"
            onClick={() => document.querySelector(".input-field").click()}
          >
            {file ? (
              <>
                <FaFile color="#1475cf" size={60} />
                <p>{fileName}</p>
              </>
            ) : (
              <>
                <MdCloudUpload color="#1475cf" size={60} />
                <p>Browse files to upload</p>
              </>
            )}
          </div>

          <div className="date_picker">
            <label htmlFor="dateInput">Date:</label>
            <input
              className="secondary-button"
              type="date"
              id="dateInput"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="upload_button">
            <button type="submit" className="secondary-button">
              Upload
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FileUploader;