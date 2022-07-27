import React, { useState, useEffect } from "react";

export default function Timer(props) {
  const [minutes, setMinutes] = useState(Number(props.min));
  const [seconds, setSeconds] = useState(Number(props.sec));
  

  useEffect(() => {
    const countdown = setInterval(() => {
      // if(parseInt(minutes)>10){
      //   props.setTimeout(false)
      //   console.log("10분초과 ")
      // }
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div>
      <div>
        <h2>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
    </div>
  );
}
