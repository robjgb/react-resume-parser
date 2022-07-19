import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css';
import { useEffect } from 'react';

export const FileUploader = ({onSuccess}) => {
    const  [files, setFiles] = useState([]);
    var [isLoading, setIsLoading] = useState(false);

    useEffect (()=>{
        var fileInput = document.querySelector('input[type=file]');
        var filenameContainer = document.querySelector('#filename');
        var dropzone = document.querySelector('label');

        fileInput.addEventListener('change', function() {
            fileInput.files.length > 1 ? filenameContainer.innerText = fileInput.files.length + " files to upload.": filenameContainer.innerText = fileInput.value.split('\\').pop();
        });

        fileInput.addEventListener('dragenter', function() {
            dropzone.classList.add('dragover');
        });

        fileInput.addEventListener('dragleave', function() {
            dropzone.classList.remove('dragover');
        });
    },[]);

    const onInputChange = (e) => {
        setFiles(e.target.files);
    };

    const onSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData();
        var dataLength = 0;

        for(let i = 0; i < files.length; i++){
            if(files.item(i).type === "application/pdf"){
                dataLength++;
                formData.append('file', files[i]);
            }
        }

        if(dataLength > 0){
            setIsLoading(true);
            axios.post('//localhost:8000/extract-text', formData)
            .then(response => {
                toast.success('Upload Success');
                var data = [false, response.data]
                onSuccess(data)
                setIsLoading(false);
            })
            .catch((e) => {
                toast.error('Upload Failed: ' + e )
                setIsLoading(false);
            })
        }
        else{
            toast.error('File not supported')
        }
    };

    return (
            <form method="post" action="#" id="#" onSubmit={onSubmit}>                 
                <div className="form-group files">
                    <label htmlFor="fileUpload">
                        <div className = "text">
                            <p> Drag & drop resumes here in .PDF format</p>
                            <img className="icon" src="https://img.icons8.com/material/96/000000/pdf-2--v1.png" alt=""></img>
                            <p> Or, <span> Upload Files</span> </p>
                            <p id="filename"></p>
                            </div>
                        <input type="file" onChange={onInputChange} id="fileUpload" disabled={isLoading} multiple></input>
                        </label>
                    <button className = "submitBtn"> Upload </button>
                </div>     
        </form>
    )
};