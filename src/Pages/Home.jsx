import React, {useState, useEffect} from "react";
import Hero from "../Components/Hero";
import axios from "axios";

export default function Home() {
  document.title = "MINI-SHOPPER | Your Trusted Destination";

  const [selectedFiles, setSelectedFile] = useState(null);

  const handleFileChange = (Event) => {
    setSelectedFile(Event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert('please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image, selectedFile');

    try{
      const response = await axios.post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Error uploading the file!');
    }
  };

  return (
    <Hero
      title={"MINI-SHOPPER"}
      description={
        "Welcome to SHOPPER, your one-stop-shop. Our easy-to-use platform makes it simple to find and purchase the products you need. Plus, enjoy exceptional customer service and support from our dedicated team."
      }
    >

      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </Hero>
  );
}
