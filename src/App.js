import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import Confetti from 'react-dom-confetti';

import './App.css';

export const LIGHTS_OFF = { backgroundColor: 'rgb(36, 32, 32)', color: '#fff' };
export const LIGHTS_ON = { backgroundColor: '#fff', color: '#333' };

export const GameDialogue = {
  0: 'Press the button to begin',
  1: 'Billy! Turn off that damn light!',
  2: '',
  3: 'Billy! I\'m warning you!',
  4: '',
  5: 'This is your last chance! Do NOT touch that light!',
  6: '',
  7: 'Game over - Lights out Billy'
};

export const CONFETTI_CONFIG = {
  angle: "0",
  spread: 360,
  startVelocity: "76",
  elementCount: "107",
  dragFriction: "0.07",
  duration: "6230",
  stagger: "0",
  width: "100px",
  height: "100px",
  perspective: "502px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
}

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = { 
      isLightOn: false,
      numberOfSwitches: 0
    }
  }

  toggleLight = () => {
    if (this.state.numberOfSwitches >= 7) {
      this.setState({  isLightOn: false, numberOfSwitches: 0 });

      return;
    }


    this.setState((prevState) => {
      return {
        numberOfSwitches: prevState.numberOfSwitches + 1,
        isLightOn: !prevState.isLightOn
      }
    })
  }

  getTheme = () => {
    if (this.state.isLightOn) {
      return LIGHTS_ON
    } 

    return LIGHTS_OFF;
  }

  getGameDialogue = () => {
    return <h1 className="dialogue">{ GameDialogue[this.state.numberOfSwitches] }</h1>
  }

  getButtonText = () => {
    if (this.state.numberOfSwitches >= 7) {
      return <span>Reset Game</span>
    }

    return this.state.isLightOn 
      ? <span>Turn off the Light</span> 
      : <span>Turn on the Light</span>
  }

  render() {
    return (
      <div  className="app" style={this.getTheme()} >
        { this.getGameDialogue() }

        <Confetti active={this.state.numberOfSwitches >= 7} config={CONFETTI_CONFIG} />

        <Button 
        className="lightSwitch" 
        onClick={this.toggleLight}
        variant={ this.state.isLightOn ? "dark" : "light" }>
            { this.getButtonText() }
        </Button>
      </div>
    )
  }
}
