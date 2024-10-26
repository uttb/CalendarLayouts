function allowDrop(ev) {
    ev.preventDefault();
  }
  
function dragStart(ev) {
    ev.dataTransfer.setData("eventId", ev.target.id);
    ev.dataTransfer.setData("eventName", ev.target.textContent);
}

function drop(ev) {
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

    ev.target.draggable = true;
    ev.target.dataset.eventId = eventId
    ev.target.dataset.eventName = eventName
    ev.target.ondragstart = (ev) => {
        console.log("dragStartCell");
        ev.dataTransfer.setData("eventId", ev.target.dataset.eventId);
        ev.dataTransfer.setData("eventName", ev.target.dataset.eventName);
        ev.dataTransfer.setData("cellId", ev.target.id);
    };
}

const dragStartCell = (ev) => {
    console.log("dragStartCell");

}


