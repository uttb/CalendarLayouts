const updateCountdown = (timeLeft) => {
    const countdownElement = document.getElementById("countdown");
    const minutes = 1 + Math.floor((timeLeft - 1) / 60);

    if(timeLeft <= 0) {
        countdownElement.textContent = 'Palun lõpetage.';
        countdownElement.style.color = "red";
        // console.log(`timeLeft: ${timeLeft}s (Palun lõpetage.)`);
        return;
    }
    if(timeLeft <= 10) {
        countdownElement.textContent = 'Jäänud on alla 10 sekundi.';
        countdownElement.style.color = "red";
        // console.log(`timeLeft: ${timeLeft}s (Jäänud on alla 10 sekundi.)`);
        return;
    }
    const minuteText = minutes === 1 ? "minut" : "minutit";
    countdownElement.textContent = `~ ${minutes} ${minuteText}`;
    // console.log(`timeLeft: ${timeLeft}s (~ ${minutes} ${minuteText})`);
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