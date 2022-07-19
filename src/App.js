import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ResumeCard from './components/resumeCard';

function App() {
  
  const [showFU, setFU] = useState(true)
  const [files, setFiles] = useState([])
  var [resumes, updateResumes] = useState([])

  const onSuccess = (data) => {
    var fileData = data[1]
    setFU(data[0])
    setFiles(fileData)

    console.log("UPLOAD SUCCESS")

    const fileList = []; 

    for(let i = 0; i < fileData.length; i++){
      fileList.push(fileData[i])      
      fetch(`./JSON-data/${fileList[i].name}.txt.json`).then(response => {
        return response.json()
      }) //parse json
      .then(value => {
        updateResumes(arr => [...arr, value])
        console.log(resumes[1])
      })
    }
  }

  const Caption = () => (
    <p className="barText" id="barText2"> Scan resumes and filter by keywords. </p>
  )

  const SearchBar = () => (
    <div className='search'>
      <input placeholder='Filter using keywords. . .' onChange={()=> {}}/>
      <img src= "https://img.icons8.com/ios-glyphs/90/000000/search-client.png" alt='search' onClick={()=> {}}/>
       </div>
  )

  const FileUpload = () => (
    <FileUploader onSuccess={onSuccess}/>
  )

  const ResumeView = () => (
    <div className='container1'>
      {
      resumes.map((resume)=>(
        <ResumeCard resume = {resume}/>
      )) 
     }
    </div>
  )

  return (
    <div className="App">

      <ToastContainer/>

      <div className="bar"> 
        <p className="barText" id="barText1">Resume Parser</p>
        {showFU ? <Caption /> : <SearchBar/> }
      </div>

      <div className='container'> 
      {showFU ? <FileUpload /> : <ResumeView/> }
      </div>
      
    </div>
    
  );


}

export default App;
