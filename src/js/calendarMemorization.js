window.onload = async () => {
    const pageName = 'calendarTask';

    const visitCount = sessionStorage.getItem(pageName) || 0;
    const eventLayoutOrder = JSON.parse(sessionStorage.getItem("eventLayoutOrder")) || ['A', 'B', 'C', 'D'];
    const eventLayout = eventLayoutOrder[visitCount]

    shuffle(eventTitles);

    for(eventId of eventLayouts[eventLayout]) {
        const cell = document.getElementById(eventId);
        const eventTitle = eventTitles.pop();
        cell.style.setProperty("background-color", "#4477CC");
        cell.style.setProperty("color", "white");
        cell.innerHTML = cell.innerHTML + ` <span style="font-weight:bold">${eventTitle}</span>`;
        cell.dataset.eventName = eventTitle;
    }

    const generatedCalendar = {}
    const cells = document.getElementsByTagName("td");
    for(cell of cells) {
        if (cell.id == "" || cell.dataset?.eventName == undefined) {
            continue;
        }
        generatedCalendar[cell.dataset.eventName] = cell.id
    }

    let results = JSON.parse(sessionStorage.getItem("results"));
    results.calendarTasks.push({
        eventLayout: eventLayout,
        task: generatedCalendar,
        answers: []
    });
    sessionStorage.setItem("results", JSON.stringify(results));

    startCountdown(180, 'calculations.html');
}