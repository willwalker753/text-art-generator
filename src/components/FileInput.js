import React from "react";

function FileInput(props) {
    const { handleChange } = props;
    return (
        <input 
            type="file"
            onChange={e => handleChange(e)}
        />
    );
}

export default FileInput;
