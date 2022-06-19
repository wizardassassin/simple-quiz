const controlContainer = document.getElementById("control-container");
const questionContainer = document.getElementById("question-container");
const startButton = document.getElementById("start-btn");
const configButton = document.getElementById("config-btn");
const nextButton = document.getElementById("next-btn");
const resetButton = document.getElementById("reset-btn");
const importButton = document.getElementById("import-btn");
const createButton = document.getElementById("create-btn");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", setNextQuestion);
resetButton.addEventListener("click", resetGame);
importButton.addEventListener("click", importGame);
createButton.addEventListener("click", createGame);

let numCorrect;
let numQuestions;
let currQuestionsList;
let questionsIndex;

function startGame() {
    startButton.classList.add("hide");
    configButton.classList.add("hide");
    importButton.classList.add("hide");
    createButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    currQuestionsList = _.cloneDeep(questions);
    numQuestions = currQuestionsList.length;
    questionsIndex = 0;
    numCorrect = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion();
}

function showQuestion() {
    const questionObj = currQuestionsList[questionsIndex];
    const question = questionObj.question;
    const answers = _.shuffle(questionObj.answers);
    questionElement.textContent = `${questionsIndex + 1}. ${question}`;
    for (const { text, correct } of answers) {
        const button = document.createElement("button");
        button.textContent = text;
        button.dataset.correct = correct;
        button.classList.add("btn", "btn-hover");
        button.addEventListener("click", selectAnswer);
        answersElement.appendChild(button);
    }
    // MathJax.typesetPromise();
    MathJax.typeset();
    questionsIndex++;
}

function resetState() {
    document.body.classList.remove("correct");
    document.body.classList.remove("incorrect");
    nextButton.classList.add("hide");
    while (answersElement.firstElementChild) {
        answersElement.removeChild(answersElement.firstElementChild);
    }
}

function selectAnswer(event) {
    const button = event.target;
    console.log(event)
    const isCorrect = button.dataset.correct === "true";
    console.log(isCorrect)
    if (isCorrect) {
        document.body.classList.add("correct");
        numCorrect++;
    } else {
        document.body.classList.add("incorrect");
    }
    for (const answerButton of answersElement.children) {
        const answerButtonIsCorrect = answerButton.dataset.correct === "true";
        if (answerButtonIsCorrect) {
            answerButton.classList.add("correct");
        } else {
            answerButton.classList.add("incorrect");
        }
        answerButton.removeEventListener("click", selectAnswer);
    }
    updateScore();
    showControls();
}

function showControls() {
    if (questionsIndex < numQuestions) {
        nextButton.classList.remove("hide");
    } else {
        resetButton.classList.remove("hide");
    }
}

function resetGame() {
    resetButton.classList.add("hide");
    startButton.classList.remove("hide");
    configButton.classList.remove("hide");
    importButton.classList.remove("hide");
    createButton.classList.remove("hide");
    resetState();
    questionElement.textContent = "0. Question";
    scoreElement.textContent = `Score: 0/0 (N/A%)`;
    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.textContent = `Answer ${i + 1}`;
        button.classList.add("btn", "btn-hover");
        answersElement.appendChild(button);
    }
    questionsIndex++;
}

function updateScore() {
    const percentage = Math.round((100 * numCorrect) / questionsIndex);
    scoreElement.textContent = `Score: ${numCorrect}/${questionsIndex} (${percentage}%)`;
}

function importGame() {}

function createGame() {}

const questions = [
    {
        question: "What is 1 + 1?",
        answers: [
            {
                text: "2",
                correct: true,
            },
            {
                text: "1",
                correct: false,
            },
            {
                text: "6",
                correct: false,
            },
            {
                text: "5",
                correct: false,
            },
        ],
    },
    {
        question: "What is \\(\\large 2 + 2\\)?",
        answers: [
            {
                text: "1",
                correct: false,
            },
            {
                text: "2",
                correct: false,
            },
            {
                text: "6",
                correct: false,
            },
            {
                text: "4",
                correct: true,
            },
        ],
    },
    {
        question: "Solve for x. \\(\\large x^2 + 3x = -1\\)",
        answers: [
            {
                text: "\\(\\large x = 1, 2\\)",
                correct: false,
            },
            {
                text: "\\(\\large x = -1, -2\\)",
                correct: true,
            },
            {
                text: "\\(\\large x = -3 + 7i, -3 - 7i\\)",
                correct: false,
            },
            {
                text: "\\(\\large x = 3 + 7i, 3 - 7i\\)",
                correct: false,
            },
        ],
    },
    {
        question: "Evaluate: \\(\\large \\sum_{i=1}^{\\infty}8\\left(\\frac{4}{9}\\right)^{i-1} \\)",
        answers: [
            {
                text: "\\(\\large 14.4 \\)",
                correct: true,
            },
            {
                text: "\\(\\large 2.72\\cdot10^{13} \\)",
                correct: false,
            },
            {
                text: "\\(\\large \\infty \\)",
                correct: false,
            },
            {
                text: "\\(\\large 20 \\)",
                correct: false,
            },
        ],
    },
    {
        question: "Integrate. \\(\\large \\int\\sin^{5}(x)dx \\)",
        answers: [
            {
                text: "\\(\\large -\\cos x+\\frac{2}{3}\\cos^{3}x-\\frac{1}{5}\\cos^{5}x+C \\)",
                correct: true,
            },
            {
                text: "\\(\\large \\cos x-\\frac{2}{3}\\cos^{3}x+\\frac{1}{5}\\cos^{5}x+C \\)",
                correct: false,
            },
            {
                text: "\\(\\large -\\cos x+\\frac{2}{3}\\sin^{3}x-\\frac{1}{5}\\cos^{5}x+C \\)",
                correct: false,
            },
            {
                text: "\\(\\large \\cos x-\\frac{2}{3}\\sin^{3}x+\\frac{1}{5}\\cos^{5}x+C \\)",
                correct: false,
            },
        ],
    },
    {
        question: "Solve for y. \\(\\large \\cos x\\frac{dy}{dx}+\\sin x\\cdot y=\\cos x\\csc x \\)",
        answers: [
            {
                text: "\\(\\large a \\)",
                correct: true,
            },
            {
                text: "\\(\\large b \\)",
                correct: false,
            },
            {
                text: "\\(\\large c \\)",
                correct: false,
            },
            {
                text: "\\(\\large d \\)",
                correct: false,
            },
        ],
    },
    {
        question: "Find the arclength of the region with the smallest area enclosed by the two polar equations: \\[\\large r_{1}=1.5+3\\cos\\theta \\] \\[\\large r_{2}=2+\\cos\\theta \\]",
        answers: [
            {
                text: "\\(\\large a \\)",
                correct: true,
            },
            {
                text: "\\(\\large b \\)",
                correct: false,
            },
            {
                text: "\\(\\large c \\)",
                correct: false,
            },
            {
                text: "\\(\\large d \\)",
                correct: false,
            },
        ],
    },
    {
        question: "Write the sigma notation for the Taylor Series of \\(\\large f\\left(x\\right)=\\frac{7}{x^{4}} \\) about \\(\\large x=-3 \\).",
        answers: [
            {
                text: "\\(\\large a \\)",
                correct: true,
            },
            {
                text: "\\(\\large b \\)",
                correct: false,
            },
            {
                text: "\\(\\large c \\)",
                correct: false,
            },
            {
                text: "\\(\\large d \\)",
                correct: false,
            },
        ],
    },
    {
        question: "Find the Lagrange error bound for the estimate of \\(\\large f\\left(1.2\\right) \\) for the 3rd degree Taylor polynomial of \\(\\large f\\left(x\\right)=e^{2x} \\) about \\(\\large x=-3 \\).",
        answers: [
            {
                text: "\\(\\large a \\)",
                correct: true,
            },
            {
                text: "\\(\\large b \\)",
                correct: false,
            },
            {
                text: "\\(\\large c \\)",
                correct: false,
            },
            {
                text: "\\(\\large d \\)",
                correct: false,
            },
        ],
    },
    {
        question: "Write the sigma notation for the Taylor Series of \\(\\large f\\left(x\\right)=7x^{2}-6x+1 \\) about \\(\\large x=2 \\).",
        answers: [
            {
                text: "\\(\\large eh? \\)",
                correct: true,
            },
            {
                text: "\\(\\large b \\)",
                correct: false,
            },
            {
                text: "\\(\\large c \\)",
                correct: false,
            },
            {
                text: "\\(\\large d \\)",
                correct: false,
            },
        ],
    },
];
