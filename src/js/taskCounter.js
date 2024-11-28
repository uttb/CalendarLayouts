const taskCounter = document.getElementById("taskCounter");

const visitCount = sessionStorage.getItem('calendarTask') || 0;

taskCounter.textContent = `${visitCount - 1} / 4`
