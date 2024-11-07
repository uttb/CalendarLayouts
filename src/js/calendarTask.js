const pageName = 'calendarTask';

const shuffleDragEvents = () => {
    const dragEvents = document.getElementsByClassName("dragEvent");

    for(let i = 0; i < dragEvents.length; i++) {
        dragEvents[i].id = `dragEvent_${22 - eventTitles.length}`;
        dragEvents[i].textContent = eventTitles.pop();
    }
}

window.onload = () => {
    shuffleDragEvents();
    showContinueButton();
    updatePageCount();
    startCountdown(360);
}

const allowDrop = (ev) => {
    ev.preventDefault();
  }
  
const dragStartEvent = (ev) => {
    ev.dataTransfer.setData("eventId", ev.target.id);
    ev.dataTransfer.setData("eventName", ev.target.textContent);
}

const dragStartCell = (ev) => {
    ev.dataTransfer.setData("eventId", ev.target.dataset.eventId);
    ev.dataTransfer.setData("eventName", ev.target.dataset.eventName);
    ev.dataTransfer.setData("cellId", ev.target.id);
}

const resetCell = (cellId) => {
    const cell = document.getElementById(cellId);
    cell.innerHTML = cell.innerHTML.split(" ")[0];
    cell.ondragover = allowDrop;
    cell.draggable = false;
    cell.ondragstart = null; 
    cell.style.setProperty("background-color", "white");
    cell.style.setProperty("color", "black");
}

const dropOnCell = (ev) => {
    ev.preventDefault();

    const eventId = ev.dataTransfer.getData("eventId");
    const eventName = ev.dataTransfer.getData("eventName");
    const cellId = ev.dataTransfer.getData("cellId");

    if (cellId != "") {
        resetCell(cellId);
    } else {
        document.getElementById(eventId).remove();
    }

    const cell = ev.target;
    // make cell look like event
    cell.innerHTML = cell.innerHTML + ` <span style="font-weight:bold">${eventName}</span>`;
    cell.style.setProperty("background-color", "#4477CC");
    cell.style.setProperty("color", "white");

    // make cell draggable
    cell.draggable = true;
    cell.dataset.eventId = eventId;
    cell.dataset.eventName = eventName;
    cell.ondragstart = dragStartCell;

    // make cell not droppable
    cell.ondragover = null;
}

const dropOnEventList = (ev) => {
    ev.preventDefault();

    const eventId = ev.dataTransfer.getData("eventId");
    const eventName = ev.dataTransfer.getData("eventName");
    const cellId = ev.dataTransfer.getData("cellId");

    if(cellId == "") {
        return;
    }

    const newEvent = document.createElement("div");
    newEvent.setAttribute("class", "dragEvent");
    newEvent.setAttribute("draggable", "true");
    newEvent.setAttribute("ondragstart", "dragStartEvent(event)");
    newEvent.setAttribute("id", eventId);
    newEvent.textContent = eventName;
    document.getElementById("eventList").appendChild(newEvent);

    resetCell(cellId);
}

const handleContinueClick = () => {
    const submittedCalendar = {};
    const cells = document.getElementsByTagName("td");
    for(cell of cells) {
        if (cell.id == "") {
            continue;
        }
        submittedCalendar[cell.id] = cell.dataset?.eventName ? cell.dataset.eventName : false;
    }

    console.log(submittedCalendar); // TODO replace with proper handling

    const visitCount = sessionStorage.getItem(pageName) || 0;
    // Check if the visit count has reached 3
    if (visitCount >= 4) {
        // Redirect to 'endPages.html' when button is clicked
        window.location.href = "closingPages.html";
    } else {
        // Redirect to 'inBetween.html' when button is clicked
        window.location.href = "inBetween.html";
    }

    // TODO broken :( window.saveResults(); 
}

const showContinueButton = () => {
    const element = document.getElementById("eventList");

    const observer = new MutationObserver((mutations) => {
    if (element.childElementCount === 0) {
        const button = document.createElement("button");
        button.textContent = "Continue"
        button.id = "continueButton"
        button.setAttribute("onclick", "handleContinueClick()")
        element.appendChild(button);
        element.setAttribute("ondragover", null);
        element.setAttribute("ondrop", null);

        observer.disconnect();
    }
    });

    observer.observe(element, { childList: true });
}

const updatePageCount = () => {
    let visitCount = sessionStorage.getItem(pageName) || 0;
    visitCount = parseInt(visitCount) + 1;
    console.log("visit count", visitCount)
    // Update the count in localStorage
    sessionStorage.setItem(pageName, visitCount);
}

