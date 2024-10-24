window.onload = () => {
    const participantGroup = 1;
    const numberOfEvents = 22; // to debug generation set to 91

    const basicCalendar = document.getElementById("basicCalendar");
    const novelCalendar = document.getElementById("novelCalendar");
    let currentCalendar;

    if (participantGroup === 1) {
        currentCalendar = novelCalendar;
        basicCalendar.remove();
    } else {
        currentCalendar = basicCalendar;
        novelCalendar.remove();
    }

    const calendarCells = currentCalendar.getElementsByTagName("td");
    const cellsWithEvents = []
    if (participantGroup === 1) {
        const blockedCells = []

        for(let i = 0; i < 73; i+=18) {
            blockedCells.push(i + 0, i + 3, i + 11, i + 14, i + 17)
        }
        blockedCells.push(90, 93, 96, 99, 110, 113, 116, 119, 122, 125);

        for(let i = 0; i < numberOfEvents; i++) {
            let randomCell;
            do {
                randomCell = Math.floor(Math.random() * 126);
            } while (blockedCells.includes(randomCell) || cellsWithEvents.includes(randomCell));
            cellsWithEvents.push(randomCell);
        }
    } else {
        for(let i = 0; i < numberOfEvents; i++) {
            let randomCell;
            do {
                randomCell = Math.floor(Math.random() * 91);
            } while (cellsWithEvents.includes(randomCell));
            cellsWithEvents.push(randomCell);
        }
    }

    for (const cellWithEvent of cellsWithEvents) {

        calendarCells[cellWithEvent].style.setProperty("background-color", "#4477CC");
        calendarCells[cellWithEvent].style.setProperty("color", "white");
        calendarCells[cellWithEvent].innerHTML = calendarCells[cellWithEvent].innerHTML + ' <span style="font-weight:bold">Event</span>';
    }
}

