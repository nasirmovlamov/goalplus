import React, { useState, useEffect } from "react";
import style from "../styles/countDown.module.css";

import { setInterval } from "timers";
interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference: number =
      new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [targetDate]);

  if (timeLeft)
    return (
      <div className={style["timer-container"] + " font-integral "}>
        <div className={style["timer"]}>
          {timeLeft.days}
          <span>days</span>
        </div>
        <div className={style["semicolon"]}>:</div>
        <div className={style["timer"]}>
          {typeof window !== "undefined"
            ? timeLeft.hours.toString().padStart(2, "0")
            : "00"}
          <span>hours</span>
        </div>
        <div className={style["semicolon"]}>:</div>
        <div className={style["timer"]}>
          {typeof window !== "undefined"
            ? timeLeft.minutes.toString().padStart(2, "0")
            : "00"}
          <span>minutes</span>
        </div>
        <div className={style["semicolon"]}>:</div>
        <div className={style["timer"]}>
          {typeof window !== "undefined"
            ? timeLeft.seconds.toString().padStart(2, "0")
            : "00"}
          <span>seconds</span>
        </div>
      </div>
    );
  return null;
};

export default Countdown;
