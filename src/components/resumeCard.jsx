import React from 'react';

function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen === 0) {
      return [];
  }
  var startIndex = 0, index, indices = [];
  if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
  }
  return indices;
}

const findLinks = (str, substr) => {
    if(!str.includes('https://')){
      var insert = 'https://';
      var indices = getIndicesOf("github", str) 
      var extra = 0;

      for(let i = 0; i < indices.length; i++){
        console.log(indices[i] + extra)
        str = [str.slice(0, indices[i] + extra), insert, str.slice(indices[i] + extra)].join('')
        extra = extra + 8
      }
      let pos2 = str.indexOf("linkedin"); 
      str = [str.slice(0, pos2), insert, str.slice(pos2)].join('')
      console.log(str)
    }
    var name = str.split(/(?=https)/)
    var result = ""
    for(let i = 0; i < name.length; i++) {
      if (name[i].includes(substr)) {
        result = name[i]
        break;
      }
    }
    return result
  }

const ResumeCard = ({ resume }) => {
    return (
        <div className='resume'>
            <p id="name">{resume.hasOwnProperty('name') ? resume.name : "N/A"}</p>
            <div className="header">
                <p className='contacts'>{resume.hasOwnProperty('phone') ? resume.phone : "N/A"}</p>
                <p className='contacts'>{resume.hasOwnProperty('email') ? resume.email : "N/A"}</p>
            </div>

            <p id="education">Education: {resume.hasOwnProperty('education') ? resume.education : "N/A"}</p>
            <p id="experience">Experience: {resume.hasOwnProperty('experience') ? resume.experience : "N/A"}</p>
            <p id="skills">Skills: {resume.hasOwnProperty('skills') ? resume.skills : "N/A"}</p>

            <p> ─────────────────────────────</p>

            <div className='footer'> 
                <a href={resume.hasOwnProperty('profiles') ? findLinks(resume.profiles, "github") : "https://github.com"} target="_blank" rel="noopener noreferrer"> 
                <img src="https://img.icons8.com/ios-glyphs/60/000000/github.png" alt = "github" className='links'></img>
                </a>

                <a href={resume.hasOwnProperty('profiles') ? findLinks(resume.profiles, "linkedin") : "https://linkedin.com"} target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/ios-glyphs/60/000000/linkedin-circled--v1.png" alt = "linkedin" className='links'></img>
                </a> 
            </div>

        </div>
    )

}

export default ResumeCard;

