const pageName = 'calendarTask';
const taskData = {
    events: {},
    startTimeStamp: null,
    endTimeStamp: null,
    taskNumber: null,
};

const shuffleDragEvents = () => {
    const dragEvents = document.getElementsByClassName("dragEvent");
    const learningLength = learningEvents.length
    if (sessionStorage.getItem("learning") === "true") {
        for (let i = 0; i < dragEvents.length; i++) {
                if (i < learningLength) {
                    dragEvents[i].id = `dragEvent_${learningLength - learningEvents.length}`;
                    dragEvents[i].textContent = learningEvents.pop();
                } else {
                    dragEvents[i].style.display = "none";
                }
        }
        sessionStorage.setItem("learning", "false");}
        else {
            for(let i = 0; i < dragEvents.length; i++) {
                dragEvents[i].id = `dragEvent_${22 - eventTitles.length}`;
                dragEvents[i].textContent = eventTitles.pop();
            }
        }
        }

window.onload = () => {
      if (sessionStorage.getItem("learning") === "true") {
        const asideTextElement = document.querySelector(".asideText");
        if (asideTextElement) {
            asideTextElement.textContent = "Palun saa tuttavaks antud kalendriga. Proovi asetada antud sündmused õigele kohale.";
        }
        startCountdown(120, 'startingExperiment.html');
    } else {
        startCountdown(360);
    }
    shuffleDragEvents();
    showContinueButton();
    updatePageCount();
    taskData.startTimeStamp = Date.now();
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
    cell.removeAttribute("data-eventId");
    cell.removeAttribute("data-eventName");
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

    logEvent(eventName, cell.id);
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

    logEvent(eventName, 'eventList');
}

const handleContinueClick = () => {
    taskData.endTimeStamp = Date.now();

    console.log(taskData); // TODO replace with proper handling
    let results = JSON.parse(sessionStorage.getItem("results"));
    results.calendarTasks[results.calendarTasks.length - 1].answers.push(taskData);
    sessionStorage.setItem("results", JSON.stringify(results));

    const visitCount = sessionStorage.getItem(pageName) || 0;
    // Check if the visit count has reached 3
    if (visitCount >= 5) {
        downloadResults();
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
        button.textContent = "Continue";
        button.id = "continueButton";
        button.addEventListener("click", handleContinueClick);
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
    taskData.taskNumber = visitCount;
    visitCount = parseInt(visitCount) + 1;
    console.log("visit count", visitCount)
    // Update the count in localStorage
    sessionStorage.setItem(pageName, visitCount);
}

const logEvent = (eventName, dropId) => {
    if (taskData.events[eventName] == undefined) {
        taskData.events[eventName] = [
            {
                historyNumber: 0,
                dropLocation: dropId,
                dropTimeStamp: Date.now()
            }
        ];
        return;
    }
    taskData.events[eventName].push(
        {
            historyNumber: taskData.events[eventName].length,
            dropLocation: dropId,
            dropTimeStamp: Date.now()
        }
    );
}

// Download results as a JSON file
function downloadResults() {
    const participantId = JSON.parse(JSON.stringify(sessionStorage.getItem('participantID')));
    const results = JSON.parse(sessionStorage.getItem('results'));
    const layout = JSON.parse(JSON.stringify(sessionStorage.getItem('selectedLayout')));
    results.layout = layout;
    results.participantId = participantId;

    if (!results) {
        console.error('No results found in sessionStorage');
        return;
    }

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('Results downloaded as JSON file'); // Debugging statement
}
