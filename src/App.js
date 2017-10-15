import React, { Component } from 'react'
import createReactClass from 'create-react-class'
import 'whatwg-fetch'
import './App.css'
import io from 'socket.io-client'

const EVENTS = {
        FETCH_STORE_SIGN:'FETCH_STORE_SIGN',
        TXT_FETCH_START:'TXT_FETCH_START',
        TXT_FETCH_SUCCESS:'TXT_FETCH_SUCCESS',
        TXT_FETCH_FAILURE:'TXT_FETCH_FAILURE',
        TXT_VALIDATION_START:'TXT_VALIDATION_START',
        TXT_VALIDATION_SUCCESS:'TXT_VALIDATION_SUCCESS',
        TXT_VALIDATION_FAILURE:'TXT_VALIDATION_FAILURE',
        PGP_FETCH_START:'PGP_FETCH_START',
        PGP_FETCH_SUCCESS:'PGP_FETCH_SUCCESS',
        PGP_FETCH_FAILURE:'PGP_FETCH_FAILURE',
        IOTA_ADDRESS_START:'IOTA_ADDRESS_START',
        IOTA_ADDRESS_SUCCESS:'IOTA_ADDRESS_SUCCESS',
        IOTA_ADDRESS_FAILURE:'IOTA_ADDRESS_FAILURE',
        PAYMENT_CONFIRMATION_START:'PAYMENT_CONFIRMATION_START',
        PAYMENT_CONFIRMATION_SUCCESS:'PAYMENT_CONFIRMATION_SUCCESS',
        PAYMENT_CONFIRMATION_FAILURE:'PAYMENT_CONFIRMATION_FAILURE',
        TRANSACTION_START:'TRANSACTION_START',
        TRANSACTION_SUCCESS:'TRANSACTION_SUCCESS',
        TRANSACTION_FAILURE:'TRANSACTION_FAILURE'
}


const apiUrl = 'http://api.verify-source.com/'
const socket = io(apiUrl)
socket.on('connect', () => console.log('connected'))
socket.on('disconnect', () => console.log('disconnected'))

const App = createReactClass({
  getInitialState() {
    return {
      step: 0,
      domain: '',
      status: 'Waiting to begin...',
      response: null
    }
  },
  handleDomain(event) {
    this.setState({domain: event.target.value})
  },
  handleBegin(event) {
    socket.emit(EVENTS.FETCH_STORE_SIGN, this.state.domain)
  },
  componentDidMount() {
    socket.on(EVENTS.TXT_FETCH_START, () => this.setState({status: `Retrieving TXT records for ${this.state.domain}`}))
    socket.on(EVENTS.TXT_FETCH_SUCCESS, (status) => this.setState({status: `Retrieved TXT records`}))
    socket.on(EVENTS.TXT_FETCH_FAILURE, (status) => this.setState({status: `Failed to retrieve TXT records`}))
    socket.on(EVENTS.TXT_VALIDATION_START, (status) => this.setState({status: `Checking for PGP key in TXT record`}))
    socket.on(EVENTS.TXT_VALIDATION_SUCCESS, (status) => this.setState({status: `PGP Key ID found in TXT record`}))
    socket.on(EVENTS.TXT_VALIDATION_FAILURE, (status) => this.setState({status: `Add this TXT record to your domain: verify-source-gpg-id=0x<YOUR-FINGERPRINT>`}))
    socket.on(EVENTS.PGP_FETCH_START, (status) => this.setState({status: `Retrieving PGP key from key servers`}))
    socket.on(EVENTS.PGP_FETCH_SUCCESS, (status) => this.setState({status: `PGP Key found and downloaded`}))
    socket.on(EVENTS.PGP_FETCH_FAILURE, (status) => this.setState({status: `PGP Key could not be found on any of the key servers we checked`}))
    socket.on(EVENTS.IOTA_ADDRESS_START, (status) => this.setState({status}))
    socket.on(EVENTS.IOTA_ADDRESS_SUCCESS, (status) => this.setState({status}))
    socket.on(EVENTS.IOTA_ADDRESS_FAILURE, (status) => this.setState({status}))
    socket.on(EVENTS.PAYMENT_CONFIRMATION_START, (status) => this.setState({status}))
    socket.on(EVENTS.PAYMENT_CONFIRMATION_SUCCESS, (status) => this.setState({status}))
    socket.on(EVENTS.PAYMENT_CONFIRMATION_FAILURE, (status) => this.setState({status}))
    socket.on(EVENTS.TRANSACTION_START, (status) => this.setState({status}))
    socket.on(EVENTS.TRANSACTION_SUCCESS, (status) => this.setState({status}))
    socket.on(EVENTS.TRANSACTION_FAILURE, (status) => this.setState({status}))
  },
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Verify-Source</h1>
        </header>
        <p className="App-intro">
          To get started, enter a domain name and click "Begin".
        </p>
        <div className="App-begin">
          <input className="App-domain-input" onChange={this.handleDomain}/>
          <button className="App-begin-button" onClick={this.handleBegin}>Begin</button>
        </div>
        <div className="App-status">
          {this.state.status}
        </div>
        {this.state.response ? 
          <div className="App-response">
            <div className="App-response-header">** COPY THESE OR THEY WILL BE LOST **</div>
            <div className="App-transaction-address">
              <div className="App-transaction-address-label">
                Transaction Address:
              </div>
              <div className="App-transaction-address-value">
                {this.state.txAddr}
              </div>
            </div>
            <div className="App-transaction-signature">
              <div className="App-transaction-signature-label">
                Verify-Source Signature:
              </div>
              <div className="App-transaction-signature-value">
                {this.state.txSig}
              </div>
            </div>
          </div> : null
        }
      </div>
    )
  }
})


export default App
