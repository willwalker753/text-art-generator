import React, { Component } from "react";
import FileInput from "../components/FileInput";
import readFileInput from "../util/readFileInput";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }


    render() {
        return (
            <div>
                <FileInput handleChange={readFileInput} />
            </div>
        );
    }
}

export default Home;