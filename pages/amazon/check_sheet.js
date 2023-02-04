import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head'

const FileUpload = () => {

    <Head>
    <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css" />
    </Head>

    const endpoint = "https://amazon-system-image-i7cgebzc3q-uc.a.run.app"

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
    };

    const handleFile2Change = (e) => {
        setFile2(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("file1", file1);
        formData.append("file2", file2);

        axios.post(`${endpoint}/upload/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        })
        .then(response => {
            const filename = response.data.export_filename.replace(/^"(.+(?="$))"$/, '$1');
            const url = `${endpoint}/download/${filename}`;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            axios.get(`${endpoint}/clear/`)
            .then(() => {
                console.log('Clear success');
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div>
        <input type="file" onChange={handleFile1Change} />
        <input type="file" onChange={handleFile2Change} />
        <button className="bg-blue-500" onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
