export const Preview = ({files}) => {
    if(!files.length) {
        return null;
    }

    return files.map((file) => <embed style = {{maxWidth: '50px', maxHeight: '50px'}} src={`//localhost:8000/${file.filename}`} alt ={file.originalname} /> );
}