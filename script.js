// Store the quiz questions and choices
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
        answer: "Shakespeare"
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "In which year did the Titanic sink?",
        choices: ["1910", "1912", "1914", "1916"],
        answer: "1912"
    }
];

// Load the quiz on the page
function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        let questionBlock = document.createElement("div");
        questionBlock.innerHTML = `<h3>${q.question}</h3>`;
        
        q.choices.forEach(choice => {
            let choiceInput = document.createElement("input");
            choiceInput.type = "radio";
            choiceInput.name = `question-${index}`;
            choiceInput.value = choice;
            choiceInput.checked = getSavedAnswer(index) === choice; // Preselect saved answer

            let choiceLabel = document.createElement("label");
            choiceLabel.textContent = choice;

            questionBlock.appendChild(choiceInput);
            questionBlock.appendChild(choiceLabel);
            questionBlock.appendChild(document.createElement("br"));
        });

        quizContainer.appendChild(questionBlock);
    });
}

// Save the selected answers in session storage
function saveProgress() {
    questions.forEach((_, index) => {
        let selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption) {
            sessionStorage.setItem(`progress-${index}`, selectedOption.value);
        }
    });
}

// Get saved answers from session storage
function getSavedAnswer(index) {
    return sessionStorage.getItem(`progress-${index}`);
}

// Submit quiz and calculate score
function submitQuiz() {
    let score = 0;

    questions.forEach((q, index) => {
        let selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    localStorage.setItem('score', score);  // Save score in localStorage
    alert(`Your score is ${score} out of ${questions.length}`);
}

// Load score from local storage
function loadScore() {
    let score = localStorage.getItem('score');
    if (score) {
        alert(`Your last saved score was ${score} out of ${questions.length}`);
    }
}

// On page load, restore progress and load the quiz
window.onload = function() {
    loadQuiz();
    loadScore();
};
