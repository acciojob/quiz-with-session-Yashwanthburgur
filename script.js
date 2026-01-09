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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], 
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

// Initialize userAnswers from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

function renderQuestions() {
  questionsElement.innerHTML = "";
  
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;
      
      // Check if this answer was previously selected
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }
      
      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        // Save progress to session storage
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });
      
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
  scoreElement.textContent = resultText;
  
  // Store score in localStorage
  localStorage.setItem("score", resultText);
});

// On page load, check for saved score and display it
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.textContent = savedScore;
}

// Initialize the quiz
renderQuestions();