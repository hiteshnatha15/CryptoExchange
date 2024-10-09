
var popup = document.getElementById('popup');
function openPopup(){
    popup.classList.add('open-popup');
}
function closePopup(){
    popup.classList.remove('open-popup');
}

function refreshContent() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "your-server-endpoint-url", true); // Replace with your server endpoint
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("refreshable-content").innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

function startCountdown(duration, display) {
    let timer = duration;
    const interval = setInterval(function () {
        let seconds = parseInt(timer % 60, 10);

        display.textContent = seconds;

        if (--timer < 0) {
            timer = duration;
            refreshContent();
        }
    }, 1000);
}

window.onload = function () {
    const countdownDisplay = document.getElementById("countdown");
    const duration = 60; // Countdown from 60 seconds
    startCountdown(duration, countdownDisplay);
};