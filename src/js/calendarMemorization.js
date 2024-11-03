window.onload = async () => {
   // const isParticipantInNovelGroup = window.location.pathname.endsWith("novelCalendarMemorization.html"); 
    
    const numberOfEvents = 22; // to debug generation set to 91

    const calendarCells = document.getElementById("calendarContainer").getElementsByTagName("td");
    const cellsWithEvents = []
//function isPageActive(pageId) {
//    const page = document.getElementById(pageId);
//    return page && page.style.display !== "none";
//}


    let isParticipantInNovelGroup = true;
   // if (isPageActive("page5")) {
    //    isParticipantInNovelGroup = true;
    //}
   
    if (isParticipantInNovelGroup) {
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
        const eventTitle = eventTitles.pop();
        calendarCells[cellWithEvent].style.setProperty("background-color", "#4477CC");
        calendarCells[cellWithEvent].style.setProperty("color", "white");
        calendarCells[cellWithEvent].innerHTML = calendarCells[cellWithEvent].innerHTML + ` <span style="font-weight:bold">${eventTitle}</span>`;
        calendarCells[cellWithEvent].dataset.eventName = eventTitle;
    }

    const generatedCalendar = {}
    const cells = document.getElementsByTagName("td");
    for(cell of cells) {
        if (cell.id == "") {
            continue;
        }
        generatedCalendar[cell.id] = cell.dataset?.eventName ? cell.dataset.eventName : false;
    }

    console.log(generatedCalendar); // TODO replace with proper handling 

 //   startCountdown(isParticipantInNovelGroup);
}