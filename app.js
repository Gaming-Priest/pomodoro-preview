import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Banner from './banner'


//ACCURATE INTERVAL JS
function accurateInterval(func, interval, opts) {
   if (!opts) opts = {};
   var clear, nextAt, timeout, wrapper, now;
   now = new Date().getTime();
   nextAt = now;
   if (opts.aligned) {
      nextAt += interval - (now % interval);
   }
   if (!opts.immediate) {
      nextAt += interval;
   }
   timeout = null;
   wrapper = function wrapper() {
      var scheduledTime = nextAt;
      nextAt += interval;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      func(scheduledTime);
   };
   clear = function clear() {
      return clearTimeout(timeout);
   };
   timeout = setTimeout(wrapper, nextAt - new Date().getTime());
   return {
      clear: clear
   };

};
//ACCURATE INTERVAL JS



// // APP COMPONENTS


class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         breakInt:5,
         sessionInt:25,
         timer:1500,
         counterColor: { color: 'wheat' },
         intID: '',
         isRunning: false,
         clockFace: 'session',
         id: 'beep',
      }
      this.startClock = this.startClock.bind(this);
      this.decrementTimer = this.decrementTimer.bind(this);
      this.clockFaceControl = this.clockFaceControl.bind(this);
      this.switchClockFace = this.switchClockFace.bind(this);
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.clockControl = this.clockControl.bind(this);
      this.clockTime = this.clockTime.bind(this);
      this.warning = this.warning.bind(this);
      this.buzzer = this.buzzer.bind(this);
      this.reset = this.reset.bind(this);
   };

   startClock() {
      this.setState({
         intID: accurateInterval(() => {
            this.decrementTimer()
            this.clockFaceControl()
         }, 1000)
      });
   };

   decrementTimer() {
      this.setState({
         timer: this.state.timer - 1
      })
   }

   clockFaceControl() {
      this.buzzer(this.state.timer)
      this.warning(this.state.timer)
      if (this.state.timer < 0) {
         if (this.state.intID) {
            this.state.intID.clear()
         }
         if (this.state.clockFace === 'session') {
            this.switchClockFace('break', this.state.breakInt * 60)
            this.startClock()
         } else {
            this.switchClockFace('session', this.state.sessionInt * 60)
            this.startClock()
         }
      }
   };


   switchClockFace(face, int) {
      this.setState({
         clockFace: face,
         timer: int,
         counterColor: ({ color: 'wheat' })
      })
   };

   increment(e) {
      if (!this.state.intID) {
         let name = e.target.name
         if (name === 'bre' && this.state.breakInt < 60) {
            this.setState({ breakInt: this.state.breakInt + 1 })
         }
         if (name === 'ses' && this.state.sessionInt < 60) {
            this.setState({
               sessionInt: this.state.sessionInt + 1,
               timer: this.state.timer + 60
            })
         }
      }
   };

   decrement(e) {
      if (!this.state.intID) {
         let name = e.target.name
         if (name === 'bre' && this.state.breakInt > 1) {
            this.setState({ breakInt: this.state.breakInt - 1 })
         }
         if (name === 'ses' && this.state.sessionInt > 1) {
            this.setState({
               sessionInt: this.state.sessionInt - 1,
               timer: this.state.timer - 60
            })
         }
      }
   };
   //

   clockControl() {
      if (!this.state.isRunning) {
         this.startClock()
         this.setState({ isRunning: true });
      } else {
         this.setState({ isRunning: false });
         if (this.state.intID) {
            this.state.intID.clear()
         };
      }
   };

   clockTime() {
      let minutes = Math.floor(this.state.timer / 60)
      let seconds = this.state.timer % 60
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds > 59 || seconds < 10 ? '0' + seconds : seconds
      return minutes + ':' + seconds
   };

   warning(int) {
      if (int < 61) {
         this.setState({ counterColor: { color: '#F21515' } });
      } else {
         this.setState({ counterColor: { color: 'wheat' } });
      }
   }

   buzzer(int) {
      if (int === 0) {
         this.refs.clockSound.play();
      }
   };
   reset() {
      this.setState({
         breakInt:5,
         sessionInt:25,
         timer:1500,
         isRunning: false,
         clockFace: 'session',
         counterColor: { color: 'wheat' },
         intID: ''
      })
      if (this.state.intID) {
         this.state.intID.clear()
      }
      this.refs.clockSound.pause();
      this.refs.clockSound.currentTime = 0;
   };

   render() {
      return (
         <React.Fragment>
   <Banner
       breakLen={this.state.breakInt}
       sessionLen={this.state.sessionInt}
       timeLeft={this.clockTime()}
       style={this.state.counterColor}
       increment={this.increment}
       decrement={this.decrement}
       reset={this.reset}
       start_stop={this.clockControl}
       clock_label={this.state.clockFace}
       />
       <audio 
       id={this.state.id}
       src="https://raw.githubusercontent.com/Gaming-Priest/pomodoro-preview/master/res/assets/Wecker-sound.mp3"
       ref="clockSound"
       preload="auto"
       />
    </React.Fragment>
      );
   }
};


ReactDOM.render(<App />, document.getElementById('app'))

//