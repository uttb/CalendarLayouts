const updateCountdown = (timeLeft) => {
    const countdownElement = document.getElementById("countdown");
    const minutes = 1 + Math.floor((timeLeft - 1) / 60);

    if(timeLeft <= 0) {
        countdownElement.textContent = 'Please come to an end.';
        countdownElement.style.color = "red";
        console.log(`timeLeft: ${timeLeft}s (Please come to an end.)`);
        return;
    }
    if(timeLeft <= 10) {
        countdownElement.textContent = 'Less than 10 seconds.';
        countdownElement.style.color = "red";
        console.log(`timeLeft: ${timeLeft}s (Less than 10 seconds.)`);
        return;
    }

    countdownElement.textContent = `~ ${minutes} minutes`;
    console.log(`timeLeft: ${timeLeft}s (~ ${minutes} minutes)`);
}

const startCountdown = (time, page) => {
    let timeLeft = time; // in seconds
    updateCountdown(timeLeft);

    const countdownTimer = setInterval(() => {
        timeLeft -= 1;
        updateCountdown(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        if(page != null) {
            window.location.href = page;
        }
      }
    }, 1000); // 1000
}