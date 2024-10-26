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

const dragEndCell = (ev) => {
    ev.target.ondragover = allowDrop;
    ev.target.draggable = false;
    ev.target.ondragstart = null; 
}

const dropOnCell = (ev) => {
    ev.preventDefault();

    const eventId = ev.dataTransfer.getData("eventId");
    const eventName = ev.dataTransfer.getData("eventName");
    const cellId = ev.dataTransfer.getData("cellId");

    if (cellId != "") {
        const oldCell = document.getElementById(cellId);
        oldCell.textContent = oldCell.textContent.split(" ")[0];
    } else {
        document.getElementById(eventId).remove();
    }

    ev.target.textContent = ev.target.textContent + " " + eventName;

    // make cell draggable
    ev.target.draggable = true;
    ev.target.dataset.eventId = eventId;
    ev.target.dataset.eventName = eventName;
    ev.target.ondragstart = dragStartCell;

    // make cell not droppable
    ev.target.ondragover = null;
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

    const oldCell = document.getElementById(cellId);
    oldCell.textContent = oldCell.textContent.split(" ")[0];
}


