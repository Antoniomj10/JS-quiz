const questions = [

    {
        question: 'Which of the following is not a JavaScript keyword?',
        choices: ['var', 'let', 'const', 'for'],
        answer: 'let'
    },
    {
        question: 'Which of the following keywords is used to define a variable in javascript?',
        choices: ['var', 'let', 'Both A and B', 'None of the Above'],
        answer: 'Both A and B'
    },
    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        choices: ['document.write()', 'console.log', 'window.alert', 'All of the Above'],
        answer: 'All of the Above'
    },
    { 
        question: 'What is the use of the <noscript> tag in Javascript?',
        choices: ['The contents are displayed by non-JS-based browsers', 'clear all the cookies and cache', 'Both A and B', 'None of the Above'],
        answer: 'The contents are displayed by non-JS-based browsers'

    },
    {
        question: 'When an operator value is NULL, the typeof returned by the unary operator is:?',
        choices: ['Boolean', 'Undefined', 'Object', 'Integer'],
        answer: 'Object'
    },
    {
        question: 'What does the Javascript “debugger” statement do??',
        choices: ['It will debug all the errors in the program at runtime', 'It acts as a breakpoint in a program.', 'It will debug error in the current statement if any ', 'All of the Above'],
        answer: 'It acts as a breakpoint in a program'
    },
    {
        question: 'What keyword is used to check whether a given property is valid or not?',
        choices: ['in', 'is in', 'exist', 'lies'],
        answer: 'in'
    },
    {
        question: 'What does the toLocateString() method do in JS?',
        choices: ['Returns a localised object representation', 'Returns a parsed string', 'Return a localized representation of an object', 'None of the above'],
        answer: 'Returns a localised object representation'
    },
    {
        question: 'Which function is used to serialize an object into a JSON string in Javascript?',
        choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
        answer: 'stringify()'
    },
    {
        question: 'How to stop an interval timer in Javascript?',
        choices: ['clearinterval', 'clearTimer', 'intervalOver', 'None of the above'],
        answer: 'clearInterval'
    }

    
];


let currentQuestion = 0;
let score = 0;
let timer = 45;
let timerInterval;

const questionText = document.getElementById('question-text');
const choiceButtons = document.querySelectorAll('.answers button');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score');

function startGame() {
    gameOverScreen.style.display = 'none';
    score = 0;
    timer = 45;
    currentQuestion = 0;
    setNextQuestion();
}
function startTimer() {
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerElement.textContent = timer;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);


}

function setNextQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        choiceButtons.forEach((button, index) => {
            button.textContent = question.choices[index];
            button.onclick = () => checkAnswer(index);
        });
    } else {
        endGame();
    }
}
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    if (choiceButtons[selectedIndex].textContent === question.answer) {
        score += 1;
        scoreElement.textContent = score;
    } else {
        timer -= 5;
    }
    currentQuestion++;
    setNextQuestion();


}

function endGame() {
    clearInterval(timerInterval);
    gameOverScreen.style.display = 'block';
    finalScoreElement.textContent = score;
}

saveScoreButton.addEventListener('click', () => {
    const initials = initialsInput.value;
    
    localStorage.setItem('initials', initials);
    localStorage.setItem('score', score);
    initialsInput.value = '';
});
let quizStarted = false;

function startQuiz() {
    if (!quizStarted) {
        quizStarted = true;
        document.getElementById('start-container').style.display = 'none';
        document.querySelector('.question').style.display = 'block';
        document.querySelector('.answers').style.display = 'block'; 
        startTimer();
        setNextQuestion();
    }
}
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startQuiz);





startGame();
