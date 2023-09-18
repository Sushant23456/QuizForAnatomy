let currentQuestion = 0;

let questions = [
    {
        image: 'images/Picture1.jpg',
        choices: ['Areolar or Loose CT', 'Adipose Tissue', 'Reticular CT', 'Dense Regular CT'],
        answer: 'Areolar or Loose CT'
    },
    {
        image: 'images/Picture2.jpg',
        choices: ['Areolar or Loose CT', 'Adipose Tissue', 'Reticular CT', 'Dense Regular CT'],
        answer: 'Adipose Tissue'
    },
    {
        image: 'images/Picture3.jpg',
        choices: ['Areolar or Loose CT', 'Adipose Tissue', 'Reticular CT', 'Dense Regular CT'],
        answer: 'Reticular CT'
    },
    {
        image: 'images/Picture4.jpg',
        choices: ['Dense Regular CT', 'Dense Irregular CT', 'Dense Elastic CT', 'Hyaline Cartilage'],
        answer: 'Dense Regular CT'
    },
    {
        image: 'images/Picture5.jpg',
        choices: ['Dense Regular CT', 'Dense Irregular CT', 'Dense Elastic CT', 'Hyaline Cartilage'],
        answer: 'Dense Irregular CT'
    },
    {
        image: 'images/Picture6.jpg',
        choices: ['Dense Regular CT', 'Dense Irregular CT', 'Dense Elastic CT', 'Hyaline Cartilage'],
        answer: 'Dense Elastic CT'
    },
    {
        image: 'images/Picture7.jpg',
        choices: ['Hyaline Cartilage', 'Elastic Cartilage', 'Fibrocartilage', 'Compact Bone'],
        answer: 'Hyaline Cartilage'
    },
    {
        image: 'images/Picture8.jpg',
        choices: ['Hyaline Cartilage', 'Elastic Cartilage', 'Fibrocartilage', 'Compact Bone'],
        answer: 'Elastic Cartilage'
    },
    {
        image: 'images/Picture9.jpg',
        choices: ['Hyaline Cartilage', 'Elastic Cartilage', 'Fibrocartilage', 'Compact Bone'],
        answer: 'Fibrocartilage'
    },
    {
        image: 'images/Picture10.jpg',
        choices: ['Compact Bone', 'Spongy Bone', 'Blood and Lymph', 'Reticular CT'],
        answer: 'Compact Bone'
    },
    {
        image: 'images/Picture11.jpg',
        choices: ['Compact Bone', 'Spongy Bone', 'Blood and Lymph', 'Reticular CT'],
        answer: 'Spongy Bone'
    },
    {
        image: 'images/Picture12.jpg',
        choices: ['Compact Bone', 'Spongy Bone', 'Blood and Lymph', 'Reticular CT'],
        answer: 'Blood and Lymph'
    }
];


// Shuffle function to randomize questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

questions = shuffle(questions);

function displayQuestion(question) {
    const imgElement = document.getElementById('questionImage');
    const choicesElements = document.querySelectorAll("#choices button");
    
    imgElement.src = question.image;
    for (let i = 0; i < choicesElements.length; i++) {
        choicesElements[i].textContent = question.choices[i];
        choicesElements[i].disabled = false;  
        choicesElements[i].style.backgroundColor = ''; 
    }

    // Update to display score at the end and show restart button
    if (currentQuestion === questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('score').textContent = "Score: " + score + "/" + questions.length;
        document.getElementById('restartBtn').style.display = 'block';
    }
}

function checkAnswer(button) {
    const chosenAnswer = button.textContent;
    const correctAnswer = questions[currentQuestion].answer;
    
    if (chosenAnswer === correctAnswer) {
        button.style.backgroundColor = 'green';
        score++;
    } else {
        button.style.backgroundColor = 'red';
    }

    document.querySelectorAll("#choices button").forEach(btn => btn.disabled = true);  
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion(questions[currentQuestion]);
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    questions = shuffle(questions);
    document.getElementById('score').textContent = '';
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
    displayQuestion(questions[currentQuestion]);
}

// Start the quiz
displayQuestion(questions[currentQuestion]);
