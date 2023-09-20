let currentQuestion = 0;
let score = 0;


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
    },  
    {
        image: 'images/Picture13.jpg',
        choices: ['Squamous', 'Simple', 'Spongy Bone', 'Blood and Lymph'],
        answer: 'Squamous'
    },
    {
        image: 'images/Picture14.jpg',
        choices: ['Squamous', 'Cuboidal', 'Columnar', 'Simple'],
        answer: 'Cuboidal'
    },
    {
        image: 'images/Picture15.jpg',
        choices: ['Squamous', 'Cuboidal', 'Columnar', 'Simple'],
        answer: 'Columnar'
    },
    {
        image: 'images/Picture16.jpg',
        choices: ['Simple', 'Stratified', 'Cuboidal', 'Columnar'],
        answer: 'Simple'
    },
    {
        image: 'images/Picture17.jpg',
        choices: ['Simple', 'Stratified', 'Cuboidal', 'Columnar'],
        answer: 'Stratified'
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
    document.getElementById('currentQuestionNumber').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

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

    const choicesButtons = document.querySelectorAll("#choices button");

    if (chosenAnswer === correctAnswer) {
        button.style.backgroundColor = 'green';
        score++;  // Increase the score
    } else {
        button.style.backgroundColor = 'red';
        // Find and highlight the correct answer
        choicesButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = 'lime';
            }
        });
    }

    // Disable all answer buttons after choosing
    choicesButtons.forEach(btn => btn.disabled = true);  
    
    // If it's the last question, display the next button one more time
    if (currentQuestion === questions.length - 1) {
        document.getElementById('nextBtn').textContent = "Finish";
    }
}


function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion(questions[currentQuestion]);
    } else if (currentQuestion === questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('score').textContent = "Score: " + score + "/" + questions.length;
        document.getElementById('restartBtn').style.display = 'block';
        displayResultMessage();
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

function getAllChoices(questions) {
    let allChoices = [];
    questions.forEach(question => {
        allChoices = [...allChoices, ...question.choices];
    });
    return [...new Set(allChoices)]; // Return unique choices
}

function getRandomizedChoices(question, allChoices) {
    let choices = [question.answer];
    while (choices.length < 4) {
        const randomChoice = allChoices[Math.floor(Math.random() * allChoices.length)];
        if (!choices.includes(randomChoice)) {
            choices.push(randomChoice);
        }
    }
    return shuffle(choices);
}

let allUniqueChoices = getAllChoices(questions);
for (let i = 12; i <= 16; i++) {
    questions[i].choices = getRandomizedChoices(questions[i], allUniqueChoices);
}



const numWatermarks = 20;  // Adjust this number based on your preference
for (let i = 0; i < numWatermarks; i++) {
    const watermark = document.createElement('div');
    watermark.className = 'watermark';
    watermark.textContent = 'I love Prasamsa <3';
    document.body.appendChild(watermark);

    // Random initial position
    positionWatermarkRandomly(watermark);

    // Start movement animation
    animateWatermark(watermark);
}

function positionWatermarkRandomly(watermark) {
    const randomTop = Math.random() * (window.innerHeight - watermark.offsetHeight);
    const randomLeft = Math.random() * (window.innerWidth - watermark.offsetWidth);
    watermark.style.top = `${randomTop}px`;
    watermark.style.left = `${randomLeft}px`;
    watermark.style.opacity = 1;  // Make it visible
}

function animateWatermark(watermark) {
    let directionX = Math.random() < 0.5 ? -1 : 1;
    let directionY = Math.random() < 0.5 ? -1 : 1;
    const speed = 1;  // Adjust speed if needed

    function move() {
        const x = parseFloat(watermark.style.left);
        const y = parseFloat(watermark.style.top);

        // Reverse direction upon hitting edge
        if (x <= 0 || x >= window.innerWidth - watermark.offsetWidth) directionX = -directionX;
        if (y <= 0 || y >= window.innerHeight - watermark.offsetHeight) directionY = -directionY;

        // Move watermark
        watermark.style.left = `${x + directionX * speed}px`;
        watermark.style.top = `${y + directionY * speed}px`;

        requestAnimationFrame(move);  // Call the next frame
    }

    move();  // Start the animation
}

// Start the quiz
displayQuestion(questions[currentQuestion]);