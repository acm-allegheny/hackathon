export default function countdown() {
  var countDownDate = new Date("Apr 12, 2025 00:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("day-num").innerHTML = days
    document.getElementById("hour-num").innerHTML = hours
    document.getElementById("minute-num").innerHTML = minutes
    document.getElementById("second-num").innerHTML = seconds
  }, 1000);
}
