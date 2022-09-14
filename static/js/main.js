document.onkeydown = function(e) {
  if (e.which == 67) {
    toggleDiv('clock');
  }
  else if (e.which == 86) {
    toggleDiv('stopwatch');
  }
  else if (e.which == 13 && running == false) {
    clickStart();
  }
  else if (e.which == 13 && running == true) {
    clickStop();
  }
};

// (Un)mute YouTube
// function toggleMute(id) {
//   let url = document.getElementById(id).src
//   url = url.replace('mute=1', 'mute=0')
//   document.getElementById(id).src = url
// }
// Toggle
function toggleDiv(id) {
  var div = document.getElementById(id);
  div.style.visibility = div.style.visibility == "hidden" ? "visible" : "hidden";
}
// Clock
function startClock () {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    m = checkTime(m);
    s = checkTime(s);
    let strTime = h + ":" + m + ":" + s + ' ' + ampm;
    document.getElementById('clock').innerHTML =  strTime;
    setTimeout(startClock, 1000);
  }


  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }


window.onload = startClock();


    // Stopwatch
  var seconds = 00;
  var tens = 00;
  var mins = 00;
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var appendMins = document.getElementById("mins")
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonReset = document.getElementById('button-reset');
  var Interval;
  var running = false;

  function clickStart() {
      running = true
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }

  function clickStop() {
    running = false
    clearInterval(Interval);
    }

  buttonStart.onclick = clickStart;

  buttonStop.onclick = clickStop;


  buttonReset.onclick = function() {
    running = false
    clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    mins = "00";
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
    appendMins.innerHTML = mins;
  }



  function startTimer () {
    tens++;

    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9){
      appendTens.innerHTML = tens;

    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 59) {
      console.log("mins");
      mins++;
      appendMins.innerHTML = "0" + mins;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

  }
