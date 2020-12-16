import React from 'react';

export default function Banner(props) {
  const { breakLen, sessionLen, timeLeft, clock_label, style, start_stop, increment, decrement, reset } = props

  return (
    <div className="container">
          <div className="controls">
            <div className="break-container">
              <h4 id="break-label">Break Length</h4>
              <div className="break">
                 <button id="break-increment" name="bre" onClick={increment}>
                  <i className="fa fa-arrow-up fa-1.5x"></i>
                  </button>
                  <h1 id="break-length">{breakLen}</h1>
                 <button id="break-decrement" name="bre" onClick={decrement}>
                  <i className="fa fa-arrow-down fa-1.5x"></i>
                 </button>
              </div>
            </div>
            
            <div className="session-container"> 
              <h4 id="session-label">Session Length</h4>
              <div className="session">
              <button id="session-increment" name="ses" onClick={increment}>
                <i className="fa fa-arrow-up fa-1.5x"></i>
              </button>
                <h1 id="session-length">{sessionLen}</h1>
                <button id="session-decrement" name="ses" onClick={decrement}>
                <i className="fa fa-arrow-down fa-1.5x"></i>
                </button>
              </div>
            </div>
              </div>
              <h2>25 + 5 CLOCK</h2>
              
              <div className="timer-container">
                <h4 id="timer-label">{clock_label}</h4>
                <h1 id="time-left" style={style}>{timeLeft}</h1>
                <div className="timer-controls">
                <button id="start_stop" onClick={start_stop}>
                  <i className="fa fa-play fa-1.5x"></i>
                  <i className="fa fa-pause fa-1.5x"></i>
         
                </button>
                <button id="reset" onClick={reset}>
                  <i className="fa fa-refresh fa-1.5x" />
                </button>
                </div>
              </div>
      </div>
  )
};

//