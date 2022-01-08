import React, { Component } from "react";
import { BrowserRouter as Router, Route ,Link, Routes, Navigate} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route path="*" element={<Navigate to="/" replace={true} />} />
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App;