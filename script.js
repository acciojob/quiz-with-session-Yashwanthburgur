const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Retrieve progress or start empty
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsElement.innerHTML = ""; // Reset
  
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

      // Check if this was previously selected (Persistence)
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // Save to session storage on click
      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Handle Submit
submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  const finalScoreText = `Your score is ${score} out of 5.`;
  scoreElement.innerText = finalScoreText;
  localStorage.setItem("score", score);
});

// Load existing score from Local Storage on refresh
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of 5.`;
}

renderQuestions();