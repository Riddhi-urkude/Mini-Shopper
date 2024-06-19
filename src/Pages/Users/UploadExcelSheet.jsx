import React from "react";
import * as XLSX from 'xlsx';

export const UploadExcelSheet = ({ onUpload }) => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            // Simulate file upload process replace with actual API call)
            // Example assumes using fetch for simplicity

            try {
                const response = await fetch('your-api-endpoint', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                onUpload(data); // handle response data as needed
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleFileSubmit=(e)=>{
        e.preventDefault();
        if(excelFile!==null){
          const workbook = XLSX.read(excelFile,{type: 'buffer'});
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          setExcelData(data.slice(0,10));
        }
    }

    return (
        <div>
            <h2>Upload Excel Sheet</h2>
            <input type="file" accept=".xlsx, .xls" onClick={handleFileChange} />

            <br />
            <br />

            <button type="Submit" className="btn-outline-primary">Upload</button>
        </div>
    );
};