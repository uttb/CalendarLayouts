/*
const showCalendar = (calendarName) => {
    fetch(`src/html/${calendarName}.html.template`)
    .then(response => response.text())
    .then(html => {
        const calendarPlaceholder = document.getElementById("calendarPlaceholder");
        calendarPlaceholder.innerHTML = html;

        const calendarScript = document.createElement("script");
        calendarScript.src = `src/js/${calendarName}.js`;

        document.body.appendChild(calendarScript);
    })
    .catch(error => console.error("Error loading HTML:", error));
}
    */

const showCalendar = async (calendarName) => {
    const response = await fetch(`src/html/${calendarName}.html`).catch(error => console.error("Error loading HTML:", error));
    const html = await response.text();
    const calendarPlaceholder = document.getElementById("calendarPlaceholder");
    calendarPlaceholder.innerHTML = html;
}

/*
window.onload = () => {
    showCalendar("novelCalendar");
}
*/