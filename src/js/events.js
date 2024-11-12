// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

const eventTitles = [
    "Gym",
    "Walk",
    "Shop",
    "Reading",
    "Journal",
    "Clean",
    "Call",
    "Baking",
    "Relax",
    "Work",
    "Brief",
    "Meeting",
    "Plan",
    "Train",
    "Study",
    "Yoga",
    "Review",
    "Code",
    "Webinar",
    "LabTime",
    "Swim",
    "Recap"
];

const learningEvents =  [
    "Reede, 15:00",
    "Esmaspäev, 20:00",
    "Pühapäev, 8:00",
    "Laupäev, 19:00",
    "Teisipäev, 11:00",
    "Kolmapäev, 14:00",
    "Neljapäev, 15:00"
]
shuffle(eventTitles);