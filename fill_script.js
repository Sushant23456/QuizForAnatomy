let dropdownQuestions = [
    {
        question: "Which tissue type is displayed in 'images/Picture1.jpg'?",
        choices: ['Areolar or Loose CT', 'Adipose Tissue', 'Reticular CT', 'Dense Regular CT'],
        answer: 'Areolar or Loose CT'
    },
    // ... (other questions) ...
];

let currentDropdownQuestion = 0;

function displayDropdownQuestion(question) {
    const questionElement = document.getElementById('questionText');
    const dropdown = document.getElementById('answerDropdown');
    
    questionElement.textContent = question.question;

    // Clear existing options and add new ones
    dropdown.innerHTML = '';
    question.choices.forEach(choice => {
        let option = document.createElement('option');
        option.value = choice;
        option.textContent = choice;
        dropdown.appendChild(option);
    });
}

function checkDropdownAnswer() {
    const dropdown = document.getElementById('answerDropdown');
    const feedback = document.getElementById('feedback');
    
    if (dropdown.value === dropdownQuestions[currentDropdownQuestion].answer) {
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = `Incorrect. Correct answer: ${dropdownQuestions[currentDropdownQuestion].answer}`;
    }
}

function nextDropdownQuestion() {
    currentDropdownQuestion++;
    if (currentDropdownQuestion < dropdownQuestions.length) {
        displayDropdownQuestion(dropdownQuestions[currentDropdownQuestion]);
    } else {
        // End the quiz or reset
        // For now, just alerting the user:
        alert("Quiz completed!");
    }
}

// Start the quiz
displayDropdownQuestion(dropdownQuestions[currentDropdownQuestion]);
