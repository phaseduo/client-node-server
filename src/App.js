import React, { Component } from 'react';
import logo from './rocket_logo.png';
import ReactPlayer from 'react-player'
import './App.css';
var io = window.io;
console.log(io)
var payload = 0;
var socket = io();

class App extends Component {
  constructor(props) {
    document.getElementById("root").setAttribute("style", "height:" + screen.availHeight + "px");
    super(props)
    this.state = {
      video: '',
      loading: true,
      text: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    payload = 0;
    document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.1); height:" + screen.availHeight + "px");
    this.setState({ video: this.input.value, loading: true });
    console.log(this.input.value);
    socket.emit('url', { url: this.input.value });
    socket.on('payload', (spayload) => {
      console.log(spayload);
      payload++;
      if (payload > 2) {
        this.setState({ loading: false, text: "" })
        document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.5); height:" + screen.availHeight + "px");
      }
    })

    window.setTimeout(() => {

    }, 3000)

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>PhaseDuo <img src={logo} className="App-logo" alt="logo" /></h1>
          <h2 className="App-intro">
            Give us a link to a video with tons of text, and we'll summarize for you!
          </h2>
        </div>
        <div className="content">
          <div className="form-group input-group-lg">
            <form onSubmit={this.handleSubmit}>
              <input type="text" className="form-control url" ref={input => this.input = input} placeholder="Enter url here" aria-describedby="sizing-addon1" />
            </form>
          </div>
          {this.state.video && <div>
            {this.state.loading && <div className="logo-container"> <img src={logo} className="App-logo-loading" /> <p>Loading...</p> </div>}
            {!this.state.loading &&
              <div className="video-container">
                <ReactPlayer url={this.state.video} height="600px" width="80%" playing controls />
                <div className="text-container">
                  <h2>Summary</h2>
                  <hr />
                  <p>{this.state.text}</p>
                </div>
              </div>}
          </div>}
        </div>
      </div>
    );
  }
}

export default App;
