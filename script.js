const questions = [
  { 
    question: "What is the capital of France?", 
    choices: ["Paris", "London", "Berlin", "Madrid"], 
    answer: "Paris" 
  },
  { 
    question: "What is the highest mountain in the world?", 
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], 
    answer: "Everest" 
  },
  { 
    question: "What is the largest country by area?", 
    choices: ["Russia", "China", "Canada", "United States"], 
    answer: "Russia" 
  },
  { 
    question: "Which is the largest planet in our solar system?", 
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],  // Fixed: Added "Saturn" to make 4 choices
    answer: "Jupiter" 
  },
  { 
    question: "What is the capital of Canada?", 
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], 
    answer: "Ottawa" 
  },
];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Initialize userAnswers from session storage or create new array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

function renderQuestions() {
  questionsElement.innerHTML = "";
  
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.innerText = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;
      radio.id = `q${i}-${choice}`;

      // Restore checked state from session storage
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.htmlFor = radio.id;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(` ${choice}`));
      
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });
    questionsElement.appendChild(questionDiv);
  });
}

submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Display score
  const resultText = `Your score is ${score} out of 5.`;
  scoreElement.innerText = resultText;
  
  // Store score in localStorage as string (as required)
  localStorage.setItem("score", resultText);
});

// Load and display previous score on page load
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.innerText = savedScore;
}

// Initial render
renderQuestions();