let applicantName = "";
let totalQuestions = 5;

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  const body = document.body;

  if (toggle) {
    toggle.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
    });
  }
});

let currentStep = 1;
let selectedDomain = "";
let score = 0;

function nextStep() {
  if (currentStep === 1) {
    const email = document.getElementById("email").value;
    applicantName = document.querySelector('#step-1 input[type="text"]').value;

    if (!email.includes("@") || !email.includes(".") || applicantName === "") {
      alert("Please enter valid details");
      return;
    }
  }

  document.getElementById(`step-${currentStep}`).classList.remove("active");

  currentStep++;

  document.getElementById(`step-${currentStep}`).classList.add("active");

  if (currentStep === 3) loadQuiz();
}

const quizzes = {
  core: [
    {
      question: "What does quantum superposition mean?",
      options: [
        "Multiple states at once",
        "Very fast computation",
        "Large memory storage",
      ],
      answer: 0,
    },
    {
      question: "What is a qubit?",
      options: ["Classical bit", "Quantum bit", "Logic gate"],
      answer: 1,
    },
    {
      question: "Which property enables quantum entanglement?",
      options: ["Locality", "Correlation", "Isolation"],
      answer: 1,
    },
    {
      question: "Quantum computing mainly improves?",
      options: ["All problems", "Specific problems", "No problems"],
      answer: 1,
    },
    {
      question: "Which is NOT a quantum phenomenon?",
      options: ["Superposition", "Entanglement", "Compilation"],
      answer: 2,
    },
  ],

  web: [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Styling System",
        "Code Styling Syntax",
      ],
      answer: 0,
    },
    {
      question: "Which tag is used for links?",
      options: ["anchor tag", "link tag", "href tag"],
      answer: 0,
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Display Object Manager",
        "Data Oriented Model",
      ],
      answer: 0,
    },
    {
      question: "Which is NOT a CSS layout?",
      options: ["Flexbox", "Grid", "Script"],
      answer: 2,
    },
    {
      question: "Which property controls spacing?",
      options: ["margin", "color", "display"],
      answer: 0,
    },
  ],

  design: [
    {
      question: "Which color combination gives high contrast?",
      options: ["Yellow on white", "Black on white", "Grey on blue"],
      answer: 1,
    },
    {
      question: "Which tool is vector-based?",
      options: ["Photoshop", "Figma", "Lightroom"],
      answer: 1,
    },
    {
      question: "What improves readability?",
      options: ["Low contrast", "Good spacing", "More colors"],
      answer: 1,
    },
    {
      question: "Which is a design principle?",
      options: ["Balance", "Recursion", "Iteration"],
      answer: 0,
    },
    {
      question: "Primary purpose of white space?",
      options: ["Decoration", "Clarity", "Coloring"],
      answer: 1,
    },
  ],
};

function loadQuiz() {
  const selectedRadio = document.querySelector('input[name="domain"]:checked');
  if (!selectedRadio) {
    alert("Please select a domain");
    currentStep--;
    document.getElementById("step-3").classList.remove("active");
    document.getElementById("step-2").classList.add("active");
    return;
  }

  selectedDomain = selectedRadio.value;
  score = 0;

  document.getElementById("quiz-title").innerText =
    selectedDomain.toUpperCase() + " Quiz";

  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  quizzes[selectedDomain].forEach((q, index) => {
    container.innerHTML += `
      <div style="margin-bottom: 25px">
        <p><strong>Q${index + 1}. ${q.question}</strong></p>
        ${q.options
          .map(
            (opt, i) => `
              <label class="quiz-option">
                <input type="radio" name="quiz-${index}" value="${i}" />
                ${opt}
              </label>
            `,
          )
          .join("")}
      </div>
    `;
  });
}

function submitQuiz() {
  const answers = quizzes[selectedDomain];

  answers.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="quiz-${index}"]:checked`,
    );
    if (selected && Number(selected.value) === q.answer) {
      score++;
    }
  });

  document.getElementById("step-3").classList.remove("active");
  document.getElementById("step-4").classList.add("active");

  let feedback = "";
  if (score >= 4) feedback = "Excellent performance!";
  else if (score >= 2) feedback = "Good attempt, keep improving!";
  else feedback = "Nice try! Explore the domain further.";

  document.getElementById("result-text").innerHTML = `
    <strong>Name:</strong> ${applicantName}<br />
    <strong>Domain:</strong> ${selectedDomain.toUpperCase()}<br />
    <strong>Score:</strong> ${score} / ${totalQuestions}<br /><br />
    ${feedback}
  `;
}
