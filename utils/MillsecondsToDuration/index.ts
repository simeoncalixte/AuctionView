import { addHours } from "date-fns";

const milliseconds = 1;
const seconds = 1000 * 1;
const minutes = 60 * seconds;
const hours = 60 * minutes;
const days = 24 * hours;
const months = 30.417 * days;

const millsecondsToDuration = (milliseconds: number) => {
  let month = 0;
  let day = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;

  if (milliseconds / months > 0) {
    month = Math.floor(milliseconds / months);
    milliseconds = milliseconds % months;
  } else {
    milliseconds = milliseconds % months;
  }

  if (milliseconds / days > 0) {
    day = Math.floor(milliseconds / days);
    milliseconds = milliseconds % days;
  } else {
    milliseconds = milliseconds % days;
  }

  if (milliseconds / hours > 0) {
    hour = Math.floor(milliseconds / hours);
    milliseconds = milliseconds % hours;
  } else {
    milliseconds = milliseconds % hours;
  }

  if (milliseconds / minutes > 0) {
    minute = Math.floor(milliseconds / minutes);
    milliseconds = milliseconds % minutes;
  } else {
    milliseconds = milliseconds % minutes;
  }

  if (milliseconds / seconds > 0) {
    second = Math.floor(milliseconds / seconds);
    milliseconds = milliseconds % seconds;
  } else {
    milliseconds = milliseconds % seconds;
  }

  return {
    month,
    day,
    hour,
    minute,
    second,
  };
};

export default millsecondsToDuration;
