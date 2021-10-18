import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function Timer() {
  const {
    seconds,
    minutes
  } = useStopwatch({ autoStart: true });


  return (
    <div style={{textAlign: 'right'}}>
      <div style={{fontSize: '15px', fontWeight: 'bolder'}}>
          <p>Time elapsed: <span>{minutes}</span> mins, <span>{seconds}</span> seconds</p>
      </div>
    </div>
  );
}

export default Timer;
