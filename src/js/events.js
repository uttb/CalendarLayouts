const eventLayouts = {
    A: [
        "Mon_8",
        "Mon_16",
        "Mon_19",
        "Tue_11",
        "Tue_13",
        "Tue_15",
        "Tue_18",
        "Tue_20",
        "Wed_10",
        "Wed_13",
        "Wed_16",
        "Wed_18",
        "Thu_9",
        "Thu_14",
        "Thu_15",
        "Thu_19",
        "Fri_9",
        "Fri_11",
        "Fri_12",
        "Fri_18",
        "Sat_14",
        "Sun_11",
    ],
    B: [
        "Mon_10",
        "Mon_14",
        "Mon_16",
        "Mon_19",
        "Tue_9",
        "Tue_12",
        "Tue_17",
        "Tue_20",
        "Wed_9",
        "Wed_12",
        "Wed_15",
        "Wed_20",
        "Thu_8",
        "Thu_11",
        "Thu_14",
        "Thu_15",
        "Thu_18",
        "Fri_11",
        "Fri_13",
        "Fri_18",
        "Sat_12",
        "Sun_17",
    ],
    C: [
        "Mon_10",
        "Mon_13",
        "Mon_15",
        "Mon_17",
        "Mon_18",
        "Tue_8",
        "Tue_12",
        "Tue_16",
        "Tue_20",
        "Wed_8",
        "Wed_9",
        "Wed_16",
        "Wed_19",
        "Thu_9",
        "Thu_11",
        "Thu_14",
        "Thu_20",
        "Fri_10",
        "Fri_12",
        "Fri_18",
        "Sat_14",
        "Sat_17",
    ],
    D: [
        "Mon_8",
        "Mon_14",
        "Mon_17",
        "Tue_8",
        "Tue_11",
        "Tue_15",
        "Tue_20",
        "Wed_9",
        "Wed_13",
        "Wed_16",
        "Wed_18",
        "Thu_10",
        "Thu_13",
        "Thu_14",
        "Thu_19",
        "Fri_10",
        "Fri_12",
        "Fri_15",
        "Fri_17",
        "Fri_19",
        "Sun_12",
        "Sun_17"
    ]
}

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