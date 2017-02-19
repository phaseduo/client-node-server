import React, { Component } from 'react';
import logo from './rocket_logo.png';
import ReactPlayer from 'react-player'
import _ from 'lodash';
import './App.css';

var io = window.io,
  payloadcount,
  socket = io(),
  payload = '',
  sumpayload = '',
  cards = {},
  counter = 0;

class App extends Component {
  constructor(props) {
    document.getElementById("root").setAttribute("style", "height:" + screen.availHeight + "px");
    super(props)
    this.state = {
      video: '',
      loading: true,
      summary: '',
      sloading: true,
      card: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCards = this.updateCards.bind(this);
  }

  updateCards(time) {
    var text;
    counter++;
    if (cards.length != 0) {
      var vtime = ((time.played * 100) + (counter / 2.55)).toString().split('.')[0]
      text = cards[vtime];
    }
    console.log(vtime);
    if (text) {
      this.setState({ card: text.card });
      console.log(this.state.card)
    }
  }

  handleSubmit(event) {
    payloadcount = 0;
    cards = [];
    counter = 0;
    document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.1); height:" + screen.availHeight + "px");
    this.setState({ video: this.input.value, loading: true, sloading: true });
    event.preventDefault();


    socket.emit('url', { url: this.input.value });


    socket.on('payload', (spayload) => {
      payload += spayload.transcript;
      sumpayload += spayload.transcript;
      payloadcount += spayload.word_confidence.length;
      document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.5); height:" + screen.availHeight + "px");
      this.setState({ loading: false });
      // console.log(spayload);
      
      fetch('http://localhost:4000/test', {
        method: 'POST',
        headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
        //mode: 'cors', 
        body: JSON.stringify({ corpus: spayload.transcript })
      }).then(resp => {
        // console.log('payload received from nlp');
        resp.json().then(obj => {
          var key = spayload.timestamps[0][1].split('.')[0];
          cards[key] = {
            time: { start: spayload.timestamps[0][1], finish: spayload.timestamps[spayload.timestamps.length - 1][2] },
            card: obj
          }
        })
      })

      if (sumpayload.split(" ").length >= 200 && _.isEmpty(this.state.summary)) {
        console.log("payload count:", payloadcount);
        fetch('http://localhost:4000/test', {
          method: 'POST',
          headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
          //mode: 'cors', 
          body: JSON.stringify({ corpus: sumpayload })
        }).then(resp => {
          resp.json().then(j => {
            this.setState({
              sloading: false, summary: _.truncate(j.summary, {
                length: 400
              })
            })
          })
        })
      }

      // if (payloadcount >= 80) {
      //   payloadcount = 0;
      //   // console.log(payload);

      //   // console.log(spayload);
      //   fetch('http://localhost:4000/test', {
      //     method: 'POST',
      //     headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
      //     //mode: 'cors', 
      //     body: JSON.stringify({ corpus: spayload.transcript })
      //   }).then(resp => {
      //     // console.log('payload received from nlp');
      //     resp.json().then(obj => {
      //       var key = spayload.timestamps[0][1].split('.')[0];
      //       cards[key] = {
      //         time: { start: spayload.timestamps[0][1], finish: spayload.timestamps[spayload.timestamps.length - 1][2] },
      //         card: obj
      //       }
      //     })
      //   })

      //   this.setState({ loading: false )
      //   document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.5); height:" + screen.availHeight + "px");
      //   payload = "";
      // }

    })

    socket.on('finished', () => {
      console.log('finished payload');
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
              <div>
                <div className="video-container">
                  <ReactPlayer url={this.state.video} height="600px" width="80%" playing controls onProgress={this.updateCards} progressFrequency="1000" />
                  <div className="text-container">
                    <h2>Summary</h2>
                    <hr />
                    <p>{this.state.summary}</p>
                  </div>
                </div>
                <div className="card-container">
                  <p>{this.state.card.description}</p>
                </div>
              </div>}
          </div>}
        </div>
      </div>
    );
  }
}

export default App;
