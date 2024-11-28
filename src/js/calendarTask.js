const pageName = 'calendarTask';
const taskData = {
    events: {},
    startTimeStamp: null,
    endTimeStamp: null,
    taskNumber: null,
};

const shuffleDragEvents = () => {
    const dragEvents = document.getElementsByClassName("dragEvent");

    for(let i = 0; i < dragEvents.length; i++) {
        dragEvents[i].id = `dragEvent_${22 - eventTitles.length}`;
        dragEvents[i].textContent = eventTitles.pop();
    }
}

const placeLearningDragEvents = () => {
    const dragEvents = document.getElementsByClassName("dragEvent");
    const learningLength = learningEvents.length
    const defaultEventsNumber = dragEvents.length

    for (let i = 0; i < defaultEventsNumber; i++) {
        if (i < learningLength) {
            dragEvents[i].id = `dragEvent-${learningEvents[i].id}`;
            dragEvents[i].textContent = learningEvents[i].name;
        } else {
            dragEvents[learningLength].remove();
        }
    }
}

window.onload = () => {
    if (sessionStorage.getItem("learning") === "true") {
        const asideTextElement = document.querySelector(".asideText");
        if (asideTextElement) {
            asideTextElement.textContent = "Palun saa tuttavaks antud kalendriga. Proovi asetada antud sündmused õigele kohale. Selle ülesande vastuseid ei salvestata - selle eesmärk on kalendriga tutvumine.";
        }
        startCountdown(120);
        placeLearningDragEvents();
        showContinueButton(handleLearningContinueClick);
    } else {
        startCountdown(360);
        shuffleDragEvents();
        showContinueButton(handleContinueClick);
    }
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

    // check if event was dropped to correct location on learning page
    if (sessionStorage.getItem("learning") === "true") {
        const learningEvent = learningEvents.find((learningEvent) => learningEvent.id == eventId.split("-")[1]);
        
        if(cell.id == eventId.split("-")[1]) {
            learningEvent.correct = true;
            cell.style.setProperty("background-color", "#4C961B");
        } else {
            learningEvent.correct = false;
            cell.style.setProperty("background-color", "#E86E2A");
        }
    }

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

const submitJsonData = async (json) => {
    // console.log("submitting data to endpoint:")
    // console.log(json);

    const response = await fetch("https://komm.cs.ut.ee/calendarexp2024", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })

    if(!response.ok) {
        console.log("failed to submitJsonData");
    }
}

const handleLearningContinueClick = () => {
    if(learningEvents.filter((learningEvent) => !learningEvent.correct).length != 0) {
        window.alert("Oled mõned sündmused kalendrisse valesti asetanud. \nVihje: valel kohal asuvad sündmused on tähistatud punasega.");
        return;
    }

    sessionStorage.setItem("learning", "false");
    window.location.href = "startingExperiment.html"
}

const handleContinueClick = async () => {
    taskData.endTimeStamp = Date.now();

    const results = JSON.parse(sessionStorage.getItem("results"));
    results.calendarTask.answer = taskData;
    sessionStorage.setItem("results", JSON.stringify({}));

    const visitCount = sessionStorage.getItem(pageName) || 0;

    /*
    Structure of json data
    {
        project: "calendarexp2024",
        participantID: "1234",
        dataset: 1,
        eventLayoutOrder: ["A", "B", "C", "D"],
        layout: "novelCalendar",
        recallTask: {},
        calculationTask: {},
        calendarTask: {
            task: {},
            answer: {
                events: {},
                startTimeStamp: 1,
                endTimeStamp: 2,
            }
        }
    }
    */
   
    const json = {
        project: "calendarexp2024",
        participantID: sessionStorage.getItem("participantID"),
        dataset: visitCount - 1,
        eventLayoutOrder: JSON.parse(sessionStorage.getItem("eventLayoutOrder")),
        layout: sessionStorage.getItem('selectedLayout'),
        ...results
    }

    await submitJsonData(json);
    // uncomment to debug 
    // downloadResults(json);

    // Check if the visit count has reached 3
    if (visitCount >= 5) {
        // Redirect to 'endPages.html' when button is clicked
        window.location.href = "closingPages.html";
    } else {
        // Redirect to 'inBetween.html' when button is clicked
        window.location.href = "inBetween.html";
    }
}

const showContinueButton = (continueClickFunction) => {
    const element = document.getElementById("eventList");

    const observer = new MutationObserver((mutations) => {
    if (element.childElementCount === 0) {
        const button = document.createElement("button");
        button.textContent = "Jätka";
        button.id = "continueButton";
        button.addEventListener("click", continueClickFunction);
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
    // console.log("visit count", visitCount)
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

// Download results as a JSON file - only used for debugging purposes
function downloadResults(json) {
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    // console.log('Results downloaded as JSON file'); // Debugging statement
}
