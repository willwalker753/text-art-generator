import React, { Component } from "react";
import FileInput from "../components/FileInput";
import { readFileAsDataURL, drawImageProp } from "../util/fileFunctions";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    handleFileChange = async e => {
        let file = e.target.files[0];
        let dataURL = await readFileAsDataURL(file);
        if(dataURL) {
            console.log(dataURL)
            var canvas = document.getElementById("some-canvas");
            var ctx = canvas.getContext("2d");
            const img = new Image();
            img.addEventListener("load", () => {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                // ctx.drawImage(img, 0, 0);
                drawImageProp(ctx, img, 0, 0, 100, 100);
            });
            img.src = dataURL;

            setTimeout(() => {
                console.log(ctx)
                console.log(ctx.getImageData(0,0,ctx.canvas.width, ctx.canvas.height))
            }, 5000)
            
        }
    }

    render() {
        return (
            <div>
                <FileInput handleChange={this.handleFileChange} />
                <canvas id="some-canvas" width="100" height="100" style={{ objectFit: "cover" }}>
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </div>
        );
    }
}

export default Home;