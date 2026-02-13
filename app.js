const quizData = [
  {
    question: "Which data structure uses FIFO (First In, First Out)?",
    answers: ["Stack", "Queue", "Tree", "Graph"],
    correctIndex: 1,
  },
  {
    question: "What is the average time complexity of binary search?",
    answers: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
  },
  {
    question: "In networking, what does HTTP stand for?",
    answers: [
      "HyperText Transfer Protocol",
      "HighText Transfer Process",
      "Hyperlink Transfer Program",
      "Host Transfer Protocol",
    ],
    correctIndex: 0,
  },
  {
    question: "Which sorting algorithm is typically O(n²) in the worst case?",
    answers: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
    correctIndex: 2,
  },
  {
    question: "What does SQL primarily manage?",
    answers: ["Operating systems", "Databases", "Network packets", "Compilers"],
    correctIndex: 1,
  },
  {
    question: "Which of these is NOT an object-oriented principle?",
    answers: ["Encapsulation", "Polymorphism", "Recursion", "Inheritance"],
    correctIndex: 2,
  },
  {
    question: "What is the role of a DNS server?",
    answers: [
      "Encrypt web traffic",
      "Resolve domain names to IP addresses",
      "Serve static website assets",
      "Compile source code",
    ],
    correctIndex: 1,
  },
  {
    question: "What does Git primarily help developers do?",
    answers: [
      "Render UI components",
      "Store binary large objects only",
      "Version and collaborate on code",
      "Execute compiled machine code",
    ],
    correctIndex: 2,
  },
];

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionProgress = document.getElementById("question-progress");
const scoreLabel = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

function renderQuestion() {
  hasAnswered = false;
  const item = quizData[currentQuestion];
  questionText.textContent = item.question;
  questionProgress.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;
  scoreLabel.textContent = `Score: ${score}`;
  nextBtn.disabled = true;

  answerButtons.replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.type = "button";
    button.addEventListener("click", () => selectAnswer(index, button));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (hasAnswered) return;
  hasAnswered = true;

  const item = quizData[currentQuestion];
  const buttons = Array.from(answerButtons.children);

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === item.correctIndex) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === item.correctIndex) {
    score += 1;
    scoreLabel.textContent = `Score: ${score}`;
  } else {
    selectedButton.classList.add("wrong");
  }

  nextBtn.disabled = false;
}

function showResults() {
  questionText.textContent = `Quiz complete! You scored ${score} out of ${quizData.length}.`;
  questionProgress.textContent = "Done";
  answerButtons.replaceChildren();
  nextBtn.hidden = true;
  restartBtn.hidden = false;
}

function nextQuestion() {
  currentQuestion += 1;

  if (currentQuestion < quizData.length) {
    renderQuestion();
    return;
  }

  showResults();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  nextBtn.hidden = false;
  restartBtn.hidden = true;
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
