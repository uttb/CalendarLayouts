// Function to switch pages by setting active class
function nextPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page' + pageNumber).classList.add('active');
}

// Function to check if terms are accepted
function checkAcceptance() {
    const termsAccepted = document.getElementById('acceptTerms').checked;
    document.getElementById('page2Next').disabled = !termsAccepted;
}

// Function to update the timer display
function updateTimerDisplay(timerElement, timeLeft) {
    if (timeLeft <= 1) {
        timerElement.innerText = `Jäänud on ${timeLeft} sekund.`;
    } else {
        timerElement.innerText = `Jäänud on ${timeLeft} sekundit.`;
    }
}

// Function to start a timer
function startTimer(duration, timerElement, callback) {
    let timeLeft = duration;
    updateTimerDisplay(timerElement, timeLeft);

    const timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timerElement, timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            callback();
        }
    }, 1000);
}

// For word recall memory test
document.addEventListener('DOMContentLoaded', function() {

    const wordsForRecall = ['kell', 'laud', 'põlv', 'põsk', 'järv', 'kass', 'kohv', 'lill', 
                            'rand', 'saun', 'talu', 'vesi', 'jää', 'krunt', 'õlu', 'torn',
                            'daam', 'keel', 'küla', 'laev', 'maal', 'proua', 'vein', 'vihm',
                            'katse', 'määr', 'näide', 'suund', 'edu', 'ilu', 'õigus', 'oskus',
                            'soov', 'tõde', 'tõsi', 'tulu', 'aeg', 'etapp', 'minek', 'mõju',
                            'hetk', 'kasum', 'komme', 'mai', 'plaan', 'tehtu', 'tulek', 'usk']
    const sequenceLength = 15;
    let wordSequence = [];

    // words do not repeat
    function getRandomWords(words, length) {
        const shuffled = [...words].sort(() => 0.5 - Math.random()); // Create a copy of the array and shuffle it
        return shuffled.slice(0, length);
    }

    function displayWordsOneByOne(sequence) {
        const wordSequenceDiv = document.getElementById('wordSequence');
        let index = 0;

        function displayNextWord() {
            if (index < sequence.length) {
                wordSequenceDiv.innerText = sequence[index];
                // console.log('Displaying word:', sequence[index]); // Debugging statement
                index++;
                setTimeout(() => {
                    wordSequenceDiv.innerText = ''; // Clear the word briefly
                    setTimeout(displayNextWord, 500); // Pause for 500ms before showing the next word
                }, 1500); // Display each word for 1500ms
            } else {
                wordSequenceDiv.style.display = 'none';
                displayRecallInput();
            }
        }

        displayNextWord();
    }

    function displayRecallInput() {
        const instructionText = document.getElementById('instructionText');
        instructionText.style.display = 'block';
        const recallSection = document.getElementById('recallSection');
        recallSection.innerHTML = ''; // Clear previous content
        const textarea = document.createElement('textarea');
        textarea.classList.add('recall-textarea');
        textarea.rows = 10; // Set the number of rows
        textarea.cols = 50; // Set the number of columns
        recallSection.appendChild(textarea);
        recallSection.style.display = 'block';
        textarea.focus();
        document.getElementById('submitRecall').style.display = 'block';

        const recallTimerElement = document.getElementById('recallTimer');
        startTimer(60, recallTimerElement, () => {
            recallTimerElement.textContent = 'Palun lõpetage.';
            recallTimerElement.style.color = "red";
        });
    }

    function checkUserRecall() {
        const textarea = document.querySelector('.recall-textarea');
        const userInput = textarea.value.split(/[\s,]+/).filter(word => word.length > 0);
        // console.log('User input:', userInput); // Debugging statement

        // store results in sessionStorage
        let results = {
            recallTask: {
                task: wordSequence,
                answer: userInput,
            },
            calendarTask : {},
            calculationTask: {}
        };
        sessionStorage.setItem("results", JSON.stringify(results));
    }

    function loadRandomLayout() {
        // Array with the layout file names
        const layouts = ["novelCalendarMemorization.html", "basicCalendarMemorization.html"];
    
        // Randomly select one of the layouts
        const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
    
        // Store the selected layout in sessionStorage
        sessionStorage.setItem("selectedLayout", randomLayout);

        // shuffleEventLayouts
        const eventLayoutOrder = ['A', 'B', 'C', 'D'];
        shuffle(eventLayoutOrder);
        sessionStorage.setItem("eventLayoutOrder", JSON.stringify(eventLayoutOrder));
        
        // Navigate to the chosen layout
       // window.location.href = randomLayout;
    }

    // Function to start the word memory task
    function startWordMemoryTask() {
        // Clear the title and the paragraph
        document.querySelector('h1').style.display = 'none';
        document.querySelector('p').style.display = 'none';
        document.getElementById('startTask').style.display = 'none';

        // Start the task
        wordSequence = getRandomWords(wordsForRecall, sequenceLength);
        displayWordsOneByOne(wordSequence);
    }

    document.getElementById('startTask').addEventListener('click', startWordMemoryTask);

    // Event listener for submitting the recall answers
    document.getElementById('submitRecall').addEventListener('click', function() {
        checkUserRecall();
        window.location.href = "taskIntroductions.html"
        loadRandomLayout();
    });
    document.getElementById('recallSection').addEventListener('input', handleInput);
    });


// For the simple calcalution task
document.addEventListener('DOMContentLoaded', function() {

    const operators = ['+', '-'];
    let calculationTasks = [];
    let currentTaskIndex = 0;
    let timer;
    let timeLeft = 25; // the duration of calculation tasks
    let answers = [];

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function generateRandomOperator() {
        return operators[Math.floor(Math.random() * operators.length)];
    }

    function generateTask() {
        let num1, num2, num3, operator1, operator2, result;

        do {
            num1 = generateRandomNumber(20);
            num2 = generateRandomNumber(20);
            num3 = generateRandomNumber(20);
            operator1 = generateRandomOperator();
            operator2 = generateRandomOperator();
            result = eval(`${num1} ${operator1} ${num2} ${operator2} ${num3}`);
        } while (result < 0);

        return `${num1} ${operator1} ${num2} ${operator2} ${num3}`;
    }

    function displayTask(task) {
        const calculationsDiv = document.getElementById('calculations');
        calculationsDiv.innerHTML = ''; // Clear previous content
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <span>${task} = </span>
            <input type="text" class="answer" data-index="${currentTaskIndex}">
        `;
        calculationsDiv.appendChild(taskDiv);

        // Add event listener for Enter key
        const input = document.querySelector('.answer');
        input.focus();
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                submitAnswer();
            }
        });
    }

    function submitAnswer() {
        const input = document.querySelector('.answer');
        const answer = input ? input.value : '';
        // console.log('Submitted answer:', answer); // Debugging statement
        answers.push(answer);

        currentTaskIndex++;
        if (timeLeft > 0) {
            const newTask = generateTask();
            displayTask(newTask);
        } else {
            clearInterval(timer);
            let results = JSON.parse(sessionStorage.getItem("results"));
            results.calculationTask = {
                tasks: calculationTasks,
                answers: answers
            };
            sessionStorage.setItem("results", JSON.stringify(results));
            loadTask(); // Move to the next page when the timer runs out
        }
    }

    function startCalculationsTimer(duration) {
        const calculationTimerElement = document.getElementById('calculationTimer');
        startTimer(25, calculationTimerElement, () => {
            clearInterval(timer);
            const results = JSON.parse(sessionStorage.getItem("results"));
            results.calculationTask = {
                tasks: calculationTasks,
                answers: answers
            };
            sessionStorage.setItem("results", JSON.stringify(results));
            loadTask(); // Move to the next page when the timer runs out
        });
    }

    // Event listener for the calculation task
    document.getElementById('submitAnswer').addEventListener('click', submitAnswer);

    // Initialize tasks and start the timer for the calculation task
    const initialTask = generateTask();
    displayTask(initialTask);
    startCalculationsTimer(25); // Start a 25-second timer
});


const dropArea = document.getElementById('dropArea');
const fileList = document.getElementById('fileList');
// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
dropArea.addEventListener(eventName, preventDefaults, false);
document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight the drop area when an item is dragged over
['dragenter', 'dragover'].forEach(eventName => {
dropArea.addEventListener(eventName, () => dropArea.classList.add('hover'), false);
});
['dragleave', 'drop'].forEach(eventName => {
dropArea.addEventListener(eventName, () => dropArea.classList.remove('hover'), false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Prevent default behavior (Prevent file from being opened)
function preventDefaults(e) {
e.preventDefault();
e.stopPropagation();
}

// Handle the dropped files
function handleDrop(e) {
const dt = e.dataTransfer;
const files = dt.files;
handleFiles(files);
}

function handleFiles(files) {
// Clear the current list of files
fileList.innerHTML = '';
// Create a new list item for each file
[...files].forEach(file => {
  const listItem = document.createElement('div');
  listItem.textContent = file.name; // Display the file name
  fileList.appendChild(listItem); // Append it to the file list
});
}

function loadTask() {
    // Retrieve the selected layout from sessionStorage
    const selectedLayout = sessionStorage.getItem("selectedLayout");

    // Check if "novelLayout" was selected and load the appropriate task page
    if (selectedLayout === "novelCalendarMemorization.html") {
        window.location.href = "novelCalendarTask.html";
    } else {
        window.location.href = "basicCalendarTask.html";
    }
}
function loadTaskMemorization() {
    // Retrieve the selected layout from sessionStorage
    const selectedLayout = sessionStorage.getItem("selectedLayout");

    // Check if "novelLayout" was selected and load the appropriate task page
    if (selectedLayout === "novelCalendarMemorization.html") {
        window.location.href = "novelCalendarMemorization.html";
    } else {
        window.location.href = "basicCalendarMemorization.html";
    }
}

