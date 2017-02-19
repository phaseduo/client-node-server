import React, { Component } from 'react';
import logo from './rocket_logo.png';
import logo_text from './logo_typepink.png'
import ReactPlayer from 'react-player'
import _ from 'lodash';
import './App.css';

var io = window.io,
  payloadcount,
  socket = io(),
  payload = '',
  sumpayload = '',
  cards = {},
  keepupdate = true,
  counter = 0,
  cardscounter = 0;

class App extends Component {
  constructor(props) {
    document.getElementById("root").setAttribute("style", "height:" + screen.height + "px");
    super(props)
    this.state = {
      video: '',
      loading: true,
      summary: '',
      sloading: true,
      cards: [],
      cardData: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.updateText = this.updateText.bind(this);
  }


  updateText() {
    if (keepupdate) {
      window.setTimeout(() => {
        // console.log(this.state);
        if (cardscounter == this.state.cards.length)
          cardscounter = 0;
        // console.log(cardscounter);
        this.setState({ cardData: this.state.cards[cardscounter++] })
        keepupdate = true;
        this.updateText();
      }, 10000);
      keepupdate = false;
    }
  }
  updateCards(time) {
    var card;
    counter++;
    // console.log(cards);
    if (!_.isEmpty(cards)) {
      var vtime = ((time.played * 100) + (counter / 2.55)).toString().split('.')[0]
      // console.log(vtime);      
      card = cards[vtime];
    }
    if (card) {
      cardscounter = 0;
      if (!_.isEmpty(card.data))
        this.setState({ cards: card.data, cardData: card.data[0] });
    } else if (!_.isEmpty(this.state.cards)) {
      this.updateText()
    }

  }

  handleSubmit(event) {
    payloadcount = 0;
    counter = 0;
    cards = [];
    cardscounter = 0;

    document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.1); height: " + screen.height + "px");
    document.getElementsByClassName("content")[0].setAttribute("style", "padding: 2% 15%");
    this.setState({ video: this.input.value, loading: true, sloading: true, cards: [], cardData: {} });
    event.preventDefault();


    socket.emit('url', { url: this.input.value });


    socket.on('payload', (spayload) => {
      payload += spayload.transcript + ' . ';
      sumpayload += spayload.transcript;
      payloadcount += payload.split(' . ').length;
      document.getElementById("root").setAttribute("style", "background-color: rgba(0, 0, 0, 0.5);  height: " + screen.height + "px");
      this.setState({ loading: false });

      if (payloadcount >= 4) {
        payloadcount = 0;
        var _payload = _.chunk(payload.split(" "), 12).map((c) => c.join(" ")).join(" . ");
        if (_.isEmpty(this.state.summary)) {
          // console.log("payload count:", payloadcount);
          fetch('http://ab03d5b5.ngrok.io/api/summary/corpus', {
            method: 'POST',
            headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify({ corpus: sumpayload })
          }).then(resp => {
            resp.json().then(j => {
              console.log("Summary", j)
              this.setState({
                sloading: false, summary: _.truncate(j.data.summary, {
                  length: 400
                })
              })
            })
          })

        }

        fetch('http://ab03d5b5.ngrok.io/api/cards/corpus', {
          method: 'POST',
          headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
          mode: 'cors',
          body: JSON.stringify({ corpus: payload })
        }).then(resp => {
          // console.log('payload received from nlp');
          // console.log(resp);
          resp.json().then(obj => {
            if (obj.status == 200) {
              var key = spayload.timestamps[0][1].toString().split('.')[0];
              // console.log(obj);
              console.log("key", key);
              cards[key] = {
                time: { start: spayload.timestamps[0][1], finish: spayload.timestamps[spayload.timestamps.length - 1][2] },
                data: obj.data,
              }
            }
          })
        })

        payload = "";
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <h1><img src={logo_text} className="logo-text" /><img src={logo} className="App-logo" alt="logo" /></h1>
          <h1 className="App-intro">
            Give us a link to a video with tons of text, and we'll summarize for you!
          </h1>
          <div className="form-group input-group-lg">
            <form onSubmit={this.handleSubmit}>
              <input type="text" className="form-control url" ref={input => this.input = input} placeholder="Enter url here" aria-describedby="sizing-addon1" />
            </form>
          </div>
          {this.state.video && <div>
            {this.state.loading && <div className="logo-container"> <img src={logo} className="App-logo-loading" /> <p>Loading Summary...</p> </div>}
            {!this.state.loading &&
              <div>
                <div className="video-container">
                  <ReactPlayer url={this.state.video} height="600px" width="80%" playing controls onProgress={this.updateCards} progressFrequency="1000" />
                  <div className="text-container">
                    <h2>Summary</h2>
                    <hr />
                    {this.state.sloading && <h5>Analazying Summary...</h5>}
                    <p>{this.state.summary}</p>
                  </div>
                </div>
                <div className="card-container">
                  {!_.isEmpty(this.state.cardData) && <p><h3>{this.state.cardData.topic}:</h3> {this.state.cardData.description}</p>}
                </div>
              </div>}
          </div>}
        </div>
      </div>
    );
  }
}

export default App;
