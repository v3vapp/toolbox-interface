import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head'

const FileUpload = () => {

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
            <div>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input_1">未出荷データ</label>
                
                <input className="form-control block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="file_input_1"  type="file" onChange={handleFile1Change} />
            </div>

            <div>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input_2">新しい注文データ</label>

                <input className="form-control block w-full px-3 py-1.5 text-base font-normal
                                text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="file_input_2" type="file" onChange={handleFile2Change} />

            </div>

            {/* <div className="flex w-full h-screen items-center justify-center bg-grey-lighter">

                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a file</span>
                    <input type='file' className="hidden" />
                </label>


            </div> */}

            <br/>
            <div>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default FileUpload;
