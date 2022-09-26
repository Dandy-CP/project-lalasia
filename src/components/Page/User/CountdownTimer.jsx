import React, { useState, useEffect } from "react";

const CountdownTimer = ({ duration }) => {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1000);
    }, 1000);
  }, [countdown]);

  const getFormatedTime = (milliseconds) => {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinutes = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinutes / 60));

    let seconds = parseInt(totalSeconds % 60);
    let minutes = parseInt(totalMinutes % 60);
    let hours = parseInt(totalHours % 24);

    return `${hours} : ${minutes} : ${seconds}`;
  };

  return <div>{getFormatedTime(countdown)}</div>;
};

export default CountdownTimer;
