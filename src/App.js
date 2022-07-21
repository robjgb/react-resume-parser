import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ResumeCard from './components/resumeCard';

function App() {
  const [query, setQuery] = useState("")
  const [showFU, setFU] = useState(true)
  var [resumes, updateResumes] = useState([])
  let fileData

  const getFilteredItems = (query, items) => {
    query = query.replace(/\s/g, '');
    query = query.toLowerCase()

    if(!query && !query.includes(',')) {
      return items;
    }
    var filteredItems = []

    if(!query.includes(',')){
      console.log(query)
      filteredItems = items.filter(resume => 
        (resume.hasOwnProperty('name') && resume.name.toLowerCase().replace(/\s/g, '').includes(query)) || (resume.hasOwnProperty('skills') && resume.skills.toLowerCase().replace(/\s/g, '').includes(query)) || (resume.hasOwnProperty('experience') && resume.experience.toLowerCase().replace(/\s/g, '').includes(query)) || (resume.hasOwnProperty('education') && resume.education.toLowerCase().replace(/\s/g, '').includes(query)))  
    }

    return filteredItems
    }

  function handleHomeClick(){
    window.location.reload(false);
  }

  const onSuccess = (data) => {
    fileData = data[1]
    console.log(fileData)
    setFU(data[0])
 
    console.log("UPLOAD SUCCESS")

    for (const [key, value] of Object.entries(fileData)) {
        updateResumes(arr => [...arr, value])
    }
  }

  var filteredResumes = getFilteredItems(query, resumes)

  const Caption = () => (
    <p className="barText" id="barText2"> Scan resumes and filter by keywords. </p>
  )

  const FileUpload = () => (
    <FileUploader onSuccess={onSuccess}/>
  )

  const ResumeView = () => (
    <div className='container1'>
      {
      filteredResumes.map((resume, index)=>(
        <ResumeCard resume = {resume}/>
      )) 
     }
    </div>
  )

  return (
    <div className="App">
      <ToastContainer/>

      <div className="bar"> 
        <p className="barText" id="barText1" onClick={handleHomeClick} style={{cursor:'pointer'}}>Resume Parser</p>
        {showFU ? <Caption /> : 
            <div className='search'>
            <input type ="text" placeholder='Filter using keywords. . .' onChange={event => setQuery(event.target.value)}/>
            <img src= "https://img.icons8.com/ios-glyphs/90/000000/search-client.png" alt='search'/>
             </div>
        }
      </div>

      <div className='container'> 
      {showFU ? <FileUpload /> : <ResumeView/> }
      </div>
      
    </div>
    
  );


}

export default App;
