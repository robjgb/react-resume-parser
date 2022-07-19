const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const ResumeParser = require('simple-resume-parser');

const app = express();

app.use(express.static('public'));
app.use(fileUpload());


app.post("/extract-text", (req, res) => {

    if(!req.files && !req.files.file) {
        res.status(500);
        res.end();
    } 

    var files = [].concat(req.files.file);

    for(let i = 0; i < files.length; i++){
        pdfParse(files[i]).then(result => {

            fs.writeFile('./public/' + `${files[i].name}` + '.txt', result.text, function(err) {
                flag: 'w'
                if(err) {
                    return console.log(err);
                }
                
                const resume = new ResumeParser('./public/' + `${files[i].name}` + '.txt');

                resume.parseToFile(__dirname + '/../../public/JSON-data/') //output subdirectory
                .then(file => {
                  console.log('JSON File converted!');

                  fs.unlink('./public/' + `${files[i].name}` + '.txt', (err) => {
                    if (err) throw err;
                  })   
                  
                  if(i === files.length -1){
                    console.log("sending files")
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send(files)
                  }
                })
                .catch(error => {
                  console.error(error);
                  res.status(500);
                  res.end();
                })
            });      
        })
    }

})

app.listen(3000, ()=> {
    console.log('App is running on port 3000')
})



