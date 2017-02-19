import React, { Component } from 'react';
import logo from './rocket_logo.png';
import ReactPlayer from 'react-player'
import './App.css';
var io = window.io,
  payloadcount,
  socket = io(),
  payload = '',
  sumpayload = '',
  cards = [],
  cardtimes = [];

class App extends Component {
  constructor(props) {
    document.getElementById("root").setAttribute("style", "height:" + screen.availHeight + "px");
    super(props)
    this.state = {
      video: '',
      loading: true,
      summary: '',
      sloading: true,
      cards: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    payloadcount = 0;
    document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.1); height:" + screen.availHeight + "px");
    this.setState({ video: this.input.value, loading: true, sloading: true });
    event.preventDefault();
    
    
    socket.emit('url', { url: this.input.value });


    socket.on('payload', (spayload) => {
      console.log('payload received from micro video');
      document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.5); height:" + screen.availHeight + "px");
      this.setState({ loading: false, summary: payload })
      payload += spayload.transcript;
      sumpayload += spayload.transcript;
      payloadcount += spayload.word_confidence.length;
      // console.log(spayload);
      cardtimes.push(spayload);
      fetch('http://localhost:4000/test', {
        method: 'POST',
        headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
        //mode: 'cors', 
        body: JSON.stringify({ corpus: spayload.transcript })
      }).then(resp => {
        console.log('payload received from nlp');
        resp.json().then(obj => {
          cards.push(obj)
        })
      })


      // if (payloadcount >= 80) {
      //   payloadcount = 0;
      //   console.log(payload);
      //   fetch('http://localhost:4000/test', {
      //     method: 'POST',
      //     headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
      //     //mode: 'cors', 
      //     body: JSON.stringify({ corpus: payload })
      //   }).then(resp => {
      //     console.log('payload received from nlp');
      //     resp.json().then(obj => {
      //       cards.push(obj)
      //     })
      //   })
      //   this.setState({ loading: false, summmary: payload })
      //   document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.5); height:" + screen.availHeight + "px");
      //   payload = "";
      // }
    })



    socket.on('finished', () => {
      console.log('finished payload ', { sumpayload });
      this.setState({
        cards: cards.map((card, key) => {
          return { card, time: cardtimes[key] }
        })
      })
      console.log(this.state.cards);
      fetch('http://localhost:4000/test', {
        method: 'POST',
        headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
        //mode: 'cors', 
        body: JSON.stringify({ corpus: payload })
      }).then(resp => {
        resp.json().then(j => {
          this.setState({ sloading: false, summary: j.summary })
        })
      })
      sumpayload = "";
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <div className="content">
          <h1>PhaseDuo <img src={logo} className="App-logo" alt="logo" /></h1>
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
                  <p>{this.state.summary}</p>
                </div>
              </div>}
          </div>}
        </div>
      </div>
    );
  }
}

export default App;
