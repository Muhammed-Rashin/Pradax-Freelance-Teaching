module.exports.getLastSeen = (document) => {
  document.forEach((value) => {
    var date1 = value.createdAt;
    var date2 = Date.now();
    var timeDifference = parseInt((date2 - date1) / 1000);

    //get exact last seen according to time
    const lastSeen = timeAgo(timeDifference);
    value.time = lastSeen;
  });

  function timeAgo(timeStamp) {
    // var currentTime = Math.floor(Date.now() / 1000)//timestamp in seconds
    // var differenceTime = currentTime - timeStamp;
    var seconds = timeStamp;
    var minutes = Math.floor(seconds / 60); // value 60 is seconds
    var hours = Math.floor(seconds / 3600); //value 3600 is 60 minutes * 60 sec
    var days = Math.floor(seconds / 86400); //86400 = 24 * 60 * 60;
    var weeks = Math.floor(seconds / 604800); // 7*24*60*60;
    var months = Math.floor(seconds / 2629440); //((365+365+365+365+366)/5/12)*24*60*60
    var years = Math.floor(seconds / 31553280); //(365+365+365+365+366)/5 * 24 * 60 * 60

    if (seconds <= 60) {
      return "Just Now";
    } else if (minutes <= 60) {
      if (minutes == 1) {
        return "one minute ago";
      } else {
        return `${minutes} minutes ago`;
      }
    } else if (hours <= 24) {
      if (hours == 1) {
        return "an hour ago";
      } else {
        return `${hours} hrs ago`;
      }
    } else if (days <= 7) {
      if (days == 1) {
        return "yesterday";
      } else {
        return `${days} days ago`;
      }
    } else if (weeks <= 4.3) {
      //4.3 == 52/12
      if (weeks == 1) {
        return "a week ago";
      } else {
        return `${weeks} weeks ago`;
      }
    } else if (months <= 12) {
      if (months == 1) {
        return "a month ago";
      } else {
        return `${months} months ago`;
      }
    } else {
      if (years == 1) {
        return "one year ago";
      } else {
        return `${years} years ago`;
      }
    }
  }
};

module.exports.getFormat = (timeStamp, format) => {
  let dateObj = new Date(Math.floor(timeStamp * 1000)); //because of timestamp is in seconds
  // adjust 0 before single digit date
  let date = ("0" + dateObj.getDate()).slice(-2); // current date
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //current month
  let year = dateObj.getFullYear(); // current year
  let hours = dateObj.getHours(); // current hours
  let minutes = dateObj.getMinutes(); // current minutes
  let seconds = dateObj.getSeconds(); // current seconds
  return getSpecificFormat(
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    format,
    getSepratorToString(format)
  );
};

//Function to get seprator
function getSepratorToString(format) {
  if (format.includes("-")) {
    return "-";
  } else if (format.includes(".")) {
    return ".";
  } else if (format.includes("/")) {
    return "/";
  } else {
    return " ";
  }
}

//Function to convert time to specific format
function getSpecificFormat(y, m, d, h, mi, sec, format, s) {
  try {
    if (format.toLowerCase() === `mm${s}dd${s}yyyy`) {
      return m + s + d + s + y;
    } else if (format.toLowerCase() === `dd${s}mm${s}yyyy`) {
      return d + s + m + s + y;
    } else if (format.toLowerCase() === `yyyy${s}dd${s}mm`) {
      return y + s + d + s + m;
    } else if (format.toLowerCase() === `yyyy${s}mm${s}dd`) {
      return y + s + m + s + d;
    } else if (format.toLowerCase() === `mm${s}dd${s}yyyy hh:mm:ss`) {
      return m + s + d + s + y + " " + h + ":" + mi + ":" + sec;
    } else if (format.toLowerCase() === `dd${s}mm${s}yyyy hh:mm:ss`) {
      return d + s + m + s + y + " " + h + ":" + mi + ":" + sec;
    } else if (format.toLowerCase() === `yyyy${s}dd${s}mm hh:mm:ss`) {
      return y + s + d + s + m + " " + h + ":" + mi + ":" + sec;
    } else if (format.toLowerCase() === `yyyy${s}mm${s}dd hh:mm:ss`) {
      return y + s + m + s + d + " " + h + ":" + mi + ":" + sec;
    } else if (format.toLowerCase() === "hh:mm") {
      return h + ":" + mi;
    } else if (format.toLowerCase() === "hh:mm:ss") {
      return h + ":" + mi + ":" + sec;
    } else if (format === `Y${s}d${s}m H:m:s`) {
      return y + s + d + s + m + " " + h + ":" + mi + ":" + sec;
    } else if (format === `Y${s}m${s}d H:m:s`) {
      return y + s + m + s + d + " " + h + ":" + mi + ":" + sec;
    } else if (format === `d${s}m${s}Y H:m:s`) {
      return d + s + m + s + y + " " + h + ":" + mi + ":" + sec;
    } else if (format === `m${s}d${s}Y H:m:s`) {
      return m + s + d + s + y + " " + h + ":" + mi + ":" + sec;
    }
  } catch (err) {
    throw err;
  }
  return new Error(`Error: Invalid format ${format}`);
}
