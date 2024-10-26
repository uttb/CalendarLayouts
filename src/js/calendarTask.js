function allowDrop(ev) {
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


