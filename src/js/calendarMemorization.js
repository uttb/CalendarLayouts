async function initializeCalendarMemorization() {

    const numberOfEvents = 22;
    const cellsWithEvents = [];
    let calendarCells = [];
    let isParticipantInNovelGroup = false;

    // Check if the novel calendar layout is visible
    const calendarLayoutNovel = document.getElementById("calendarLayoutNovel");
    if (calendarLayoutNovel && calendarLayoutNovel.style.display !== "none") {
        isParticipantInNovelGroup = true;
        calendarCells = calendarLayoutNovel.getElementsByTagName("td");
    } else {
        const calendarLayoutBasic = document.getElementById("calendarLayoutBasic");
        if (calendarLayoutBasic) {
            calendarCells = calendarLayoutBasic.getElementsByTagName("td");
        }
    }
    console.log("Available events:", eventTitles)
    console.log("Is participant in novel group:", isParticipantInNovelGroup);

    if (isParticipantInNovelGroup) {
        const blockedCells = [];
        for (let i = 0; i < 73; i += 18) {
            blockedCells.push(i + 0, i + 3, i + 11, i + 14, i + 17);
        }
        blockedCells.push(90, 93, 96, 99, 110, 113, 116, 119, 122, 125);

        for (let i = 0; i < numberOfEvents; i++) {
            let randomCell;
            do {
                randomCell = Math.floor(Math.random() * 126);
            } while (blockedCells.includes(randomCell) || cellsWithEvents.includes(randomCell));
            cellsWithEvents.push(randomCell);
        }
    } else {
        for (let i = 0; i < numberOfEvents; i++) {
            let randomCell;
            do {
                randomCell = Math.floor(Math.random() * 91);
            } while (cellsWithEvents.includes(randomCell));
            cellsWithEvents.push(randomCell);
        }
    }

    for (const cellWithEvent of cellsWithEvents) {
        const eventTitle = eventTitles.pop();
        calendarCells[cellWithEvent].style.setProperty("background-color", "#4477CC");
        calendarCells[cellWithEvent].style.setProperty("color", "white");
        calendarCells[cellWithEvent].innerHTML += ` <span style="font-weight:bold">${eventTitle}</span>`;
        calendarCells[cellWithEvent].dataset.eventName = eventTitle;
    }

    const generatedCalendar = {};
    const cells = document.getElementsByTagName("td");
    for (const cell of cells) {
        if (cell.id == "") continue;
        generatedCalendar[cell.id] = cell.dataset?.eventName || false;
    }

    console.log(generatedCalendar); // Replace with proper handling as needed
}
