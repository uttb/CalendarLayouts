
// Main script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded'); // Debugging statement

    // Number recall memory test variables
    const sequenceLength = 10;
    let numberSequence = [];
    
    // Simple calculation task variables
    const numTasks = 4;
    const operators = ['+', '-'];
    let tasks = [];


    // Function to check if terms are accepted
    function checkAcceptance() {
        const termsAccepted = document.getElementById('acceptTerms').checked;
        document.getElementById('page2Next').disabled = !termsAccepted;
    }

    // For number recall memory test
    function generateNumberSequence(length) {
        const sequence = Array.from({ length }, () => Math.floor(Math.random() * 10));
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
                    numberSequenceDiv.innerText = '';
                    setTimeout(displayNextDigit, 200);
                }, 1000);
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
        saveResults(numberSequence, userInput);
    }

    function saveResults(sequence, userInput) {
        const results = {
            sequence: sequence,
            userInput: userInput,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'results.json';
        a.click();
        URL.revokeObjectURL(url);
        console.log('Results saved'); // Debugging statement
    }

    // Simple calculation task functions
    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function generateRandomTask() {
        const taskLength = Math.floor(Math.random() * 4) + 2; // Random length between 2 and 5
        let task = `${generateRandomNumber(20)}`;
        for (let i = 1; i < taskLength; i++) {
            const operator = operators[Math.floor(Math.random() * operators.length)];
            const num = generateRandomNumber(20);
            task += ` ${operator} ${num}`;
        }
        return task;
    }

    function generateTasks(num) {
        tasks = Array.from({ length: num }, generateRandomTask);
        console.log('Generated tasks:', tasks); // Debugging statement
    }

    function displayTasks() {
        const calculationsDiv = document.getElementById('calculations');
        calculationsDiv.innerHTML = ''; // Clear previous content
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `
                <span>${task} = </span>
                <input type="text" class="answer" data-index="${index}">
            `;
            calculationsDiv.appendChild(taskDiv);
        });
    }

    function submitAnswers() {
        const answers = Array.from(document.querySelectorAll('.answer')).map(input => input.value);
        const results = {
            tasks: tasks,
            answers: answers,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'results.json';
        a.click();
        URL.revokeObjectURL(url);
        console.log('Results saved'); // Debugging statement
    }

    // Event listeners
    document.getElementById('startTask').addEventListener('click', function() {
        numberSequence = generateNumberSequence(sequenceLength);
        displayDigitsOneByOne(numberSequence);
        document.getElementById('startTask').style.display = 'none';
    });

    document.getElementById('submitRecall').addEventListener('click', checkUserRecall);
    document.getElementById('recallSection').addEventListener('input', handleInput);

    document.getElementById('submitAnswers').addEventListener('click', submitAnswers);

    // Generate tasks for the calculation task
    generateTasks(numTasks);
    displayTasks();
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