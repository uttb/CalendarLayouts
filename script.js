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

// // Form submission handler - if we process with this architecture, it should lead to the next page
// document.getElementById('participantForm').onsubmit = function(event) {
//     event.preventDefault();
//     alert('Thank you! The experiment will now begin.');
//     // Here you can add redirection or additional JS to start the experiment
// };


// For number recall memory test
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded'); // Debugging statement to ensure script is loaded

    const sequenceLength = 10;
    let numberSequence = [];


    function generateNumberSequence(length) {
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(Math.floor(Math.random() * 10));
        }
        console.log('Generated sequence:', sequence); // Debugging statement
        return sequence;
    }

    function displayDigitsOneByOne(sequence) {
        const numberSequenceDiv = document.getElementById('numberSequence');
        let index = 0;

        function displayNextDigit() {
            if (index < sequence.length) {
                numberSequenceDiv.innerText = sequence[index];
                console.log('Displaying digit:', sequence[index]); // Debugging statement
                index++;
                setTimeout(() => {
                    numberSequenceDiv.innerText = ''; // Clear the digit briefly
                    setTimeout(displayNextDigit, 200); // Pause for 200ms before showing the next digit
                }, 1000); // Display each digit for 1000ms
            } else {
                numberSequenceDiv.style.display = 'none';
                displayRecallInputs(sequence.length);
            }
        }

        displayNextDigit();
    }

    function displayRecallInputs(length) {
        const recallSection = document.getElementById('recallSection');
        recallSection.innerHTML = ''; // Clear previous content
        for (let i = 0; i < length; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add('recall-input');
            input.dataset.index = i;
            recallSection.appendChild(input);
        }
        recallSection.style.display = 'block';
        document.querySelector('.recall-input').focus();
        document.getElementById('submitRecall').style.display = 'block';
        console.log('Displayed recall inputs'); // Debugging statement
    }

    function handleInput(event) {
        const input = event.target;
        const index = parseInt(input.dataset.index, 10);
        if (input.value.length === 1 && index < sequenceLength - 1) {
            document.querySelector(`.recall-input[data-index="${index + 1}"]`).focus();
        }
    }

    function checkUserRecall() {
        const userInput = Array.from(document.querySelectorAll('.recall-input')).map(input => parseInt(input.value, 10));
        console.log('User input:', userInput); // Debugging statement

        // store results in sessionStorage
        let results = {
            layout: null,
            recallTask: {
                task: numberSequence,
                answer: userInput,
            },
            calendarTasks : [],
            calculationTasks: []
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
    
        // Navigate to the chosen layout
       // window.location.href = randomLayout;
    }
    
    document.getElementById('startTask').addEventListener('click', function() {
        numberSequence = generateNumberSequence(sequenceLength);
        displayDigitsOneByOne(numberSequence);
        document.getElementById('startTask').style.display = 'none';
    });

    // Event listener for submitting the recall answers
    document.getElementById('submitRecall').addEventListener('click', function() {
        checkUserRecall();
        loadRandomLayout();
        loadTask();
    });
    document.getElementById('recallSection').addEventListener('input', handleInput);
});


// For the simple calcalution task
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded'); // Debugging statement to ensure script is loaded

    const operators = ['+', '-'];
    let calculationTasks = [];
    let currentTaskIndex = 0;
    let timer;
    let timeLeft = 25; // the duration of calculation tasks
    let anwers = [];

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function generateTask() {
        const taskLength = Math.floor(Math.random() * 4) + 2; // Random length between 2 and 5
        let task = `${generateRandomNumber(20)}`;
        for (let i = 1; i < taskLength; i++) {
            const operator = operators[Math.floor(Math.random() * operators.length)];
            const num = generateRandomNumber(20);
            task += ` ${operator} ${num}`;
        }
        calculationTasks.push(task);
        console.log('Generated task:', task); // Debugging statement
        return task;
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
        console.log('Submitted answer:', answer); // Debugging statement
        anwers.push(answer);

        currentTaskIndex++;
        if (timeLeft > 0) {
            const newTask = generateTask();
            displayTask(newTask);
        } else {
            clearInterval(timer);
            let results = JSON.parse(sessionStorage.getItem("results"));
            results.calculationTasks.push({
                tasks: calculationTasks,
                answers: anwers
            });
            sessionStorage.setItem("results", JSON.stringify(results));
            loadTask(); // Move to the next page when the timer runs out
        }
    }

    function startTimer(duration) {
        timeLeft = duration;
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                console.log('Time is up!'); // Debugging statement
                const results = JSON.parse(sessionStorage.getItem("results"));
                results.calculationTasks.push({
                    tasks: calculationTasks,
                    answers: anwers
                });
                sessionStorage.setItem("results", JSON.stringify(results));
                loadTask(); // Move to the next page when the timer runs out
            }
        }, 1000);
    }

    // Event listener for the calculation task
    document.getElementById('submitAnswer').addEventListener('click', submitAnswer);

    // Initialize tasks and start the timer for the calculation task
    const initialTask = generateTask();
    displayTask(initialTask);
    startTimer(25); // Start a 25-second timer
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

