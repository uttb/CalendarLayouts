const startCountdown = () => {

    let timeLeft = 9; // set to desired time minus one second. // TODO fix // remember to also update the time in html 

    const countdownElement = document.getElementById("countdown");
    const countdownTimer = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      countdownElement.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        window.location.href = "/"; // TODO change
      }

      timeLeft -= 1;
    }, 1000);
}