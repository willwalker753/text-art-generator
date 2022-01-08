const readFileInput = e => {
    console.log(e)
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
        console.log(fileReader.result)
    }
    fileReader.onerror = () => {
        console.error(fileReader.error)
    }
}

export default readFileInput;