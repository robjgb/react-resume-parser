const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const ResumeParser = require('simple-resume-parser');
const path = require('path');
const app = express();

app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, '../build')));

app.post("/extract-text", (req, res) => {

    if(!req.files && !req.files.file) {
        res.status(500);
        res.end();
    } 
    var JSONfiles = {}
    var files = [].concat(req.files.file);
    var counter = 0

    for(let i = 0; i < files.length; i++){
        pdfParse(files[i]).then(result => {

            fs.writeFile(__dirname + '/../../react-resume-parser/src/server/' + `${files[i].name}` + '.txt', result.text, function(err) {
                flag: 'w'
                if(err) {
                    return console.log(err);
                }
                
                const resume = new ResumeParser(__dirname + '/../../react-resume-parser/src/server/' + `${files[i].name}` + '.txt');

                resume.parseToFile(__dirname + '/../../react-resume-parser/src/server/public') //output subdirectory
                .then(file => {
                    secondFunction()
                    function firstFunction(){
                      var data = require(__dirname + `/../../react-resume-parser/src/server/public/${files[i].name}` + '.txt.json')
                      JSONfiles["key" + counter] = data;
                      fs.unlink(__dirname + '/../../react-resume-parser/src/server/' + `${files[i].name}` + '.txt', (err) => {
                        if (err) throw err;
                      }) 
                      counter++
                      return;              
                    }

                    async function secondFunction(){
                      await firstFunction()
                      console.log("JSON file converted!")
                      if(counter === files.length){
                        console.log(Object.keys(JSONfiles).length)
                        console.log("sending files")
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send(JSONfiles)
                      }     
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..build', 'index.html'));
});

app.listen(process.env.PORT || 5000, ()=> {
    console.log('App is running on port 5000')
})



