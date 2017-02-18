import React, { Component } from 'react';
import logo from './rocket_logo.png';
import ReactPlayer from 'react-player'
import './App.css';


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
    this.setState({ video: this.input.value });
    window.setTimeout(() => {
      this.setState({ loading: false, text: "Marvel's The Avengers[4] (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland),[1][5] or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures.1 It is the sixth film in the Marvel Cinematic Universe. The film was written and directed by Joss Whedon and features an ensemble cast that includes Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Tom Hiddleston, Clark Gregg, Cobie Smulders, Stellan Skarsgård, and Samuel L. Jackson. In the film, Nick Fury, director of the peacekeeping organization S.H.I.E.L.D., recruits Iron Man, Captain America, the Hulk, and Thor to form a team that must stop Thor's brother Loki from subjugating Earth." })
      document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.5); height:" + screen.availHeight + "px");
    }, 3000)
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>PhaseDuo <img src={logo} className="App-logo" alt="logo" /></h1>
        </div>
        <div className="content">
          <h2 className="App-intro">
            Give us a link to a video with tons of text, and we'll summarize for you!
          </h2>
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
