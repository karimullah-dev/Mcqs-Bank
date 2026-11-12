const STORAGE_KEY = "academic-quiz-progress-v1";

const DATA_URLS = {
  pakistan: "data/Pakistan_Studies_MCQs_200.json",
  geography: "data/Geography_of_Pakistan_MCQs.json",
  dailydose: "data/dailydose.json",
  pastpapers: "data/Pastpapers.json",
  motorway: "data/Motorway.json",
  computer: "data/Computer.json",
};

const state = {
  quizzes: {},
  subject: new URLSearchParams(window.location.search).get("subject") || "pakistan",
  currentIndex: 0,
  indices: {},
  answers: {},
};

const elements = {
  progressLabel: document.querySelector("#progress-label"),
  progressPercent: document.querySelector("#progress-percent"),
  progressFill: document.querySelector("#progress-fill"),
  correctCount: document.querySelector("#correct-count"),
  wrongCount: document.querySelector("#wrong-count"),
  remainingCount: document.querySelector("#remaining-count"),
  questionNumber: document.querySelector("#question-number"),
  topicPill: document.querySelector("#topic-pill"),
  questionText: document.querySelector("#question-text"),
  options: document.querySelector("#options"),
  feedback: document.querySelector("#feedback"),
  previousButton: document.querySelector("#previous-button"),
  nextButton: document.querySelector("#next-button"),
  resetButton: document.querySelector("#reset-button"),
  questionCard: document.querySelector("#question-card"),
  completeCard: document.querySelector("#complete-card"),
  completionSummary: document.querySelector("#completion-summary"),
  restartButton: document.querySelector("#restart-button"),
  loadingError: document.querySelector("#loading-error"),
  subjectButtons: document.querySelectorAll(".subject-button"),
};

function saveProgress() {
  try {
    state.indices[state.subject] = state.currentIndex;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        indices: state.indices,
        answers: state.answers,
        savedAt: new Date().toISOString(),
      })
    );
  } catch (_) {}
}

function restoreProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return;
    if (saved.indices && typeof saved.indices === "object") {
      state.indices = saved.indices;
    }
    if (saved.answers && typeof saved.answers === "object") {
      Object.keys(state.quizzes).forEach((subject) => {
        if (Array.isArray(saved.answers[subject])) {
          const total = state.quizzes[subject].questions.length;
          state.answers[subject] = Array.from(
            { length: total },
            (_, idx) => saved.answers[subject][idx] || null
          );
        }
      });
    }
  } catch (_) {}
}

async function loadQuiz() {
  try {
    const responses = await Promise.all(
      Object.entries(DATA_URLS).map(async ([subject, url]) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Unable to load ${subject} data: ${response.status}`);
        const rawData = await response.json();
        return [subject, normalizeQuiz(subject, rawData)];
      })
    );
    state.quizzes = Object.fromEntries(responses);
    Object.keys(state.quizzes).forEach((subject) => {
      state.answers[subject] = Array(state.quizzes[subject].questions.length).fill(null);
      state.indices[subject] = 0;
    });
    if (!state.quizzes[state.subject]) state.subject = "pakistan";
    restoreProgress();
    state.currentIndex = Math.min(
      state.indices[state.subject] || 0,
      state.quizzes[state.subject].questions.length - 1
    );
    elements.subjectButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.subject === state.subject);
    });
    render();
  } catch (error) {
    console.error("Quiz loading failed:", error);
    elements.questionCard.classList.add("hidden");
    elements.loadingError.classList.remove("hidden");
  }
}

function normalizeQuiz(subject, rawData) {
  if (subject === "pakistan" || subject === "dailydose") return rawData;
  const titles = {
    geography: "Geography of Pakistan MCQs",
    pastpapers: "Past Papers MCQs",
    motorway: "Motorway MCQs",
    computer: "Computer Science MCQs",
  };
  const topics = {
    geography: "Geography of Pakistan",
    pastpapers: "Past Papers",
    motorway: "Motorway",
    computer: "Computer Science",
  };
  return {
    title: titles[subject] || "Academic MCQs",
    topics: [topics[subject] || "Academic"],
    questions: rawData.map((question, index) => ({
      id: index + 1,
      question: question.Question,
      options: question.options,
      correct: question.correct,
      explanation: question.explanation,
    })),
  };
}

function getQuiz() {
  return state.quizzes[state.subject];
}

function getAnswers() {
  return state.answers[state.subject];
}

function getScore() {
  const quiz = getQuiz();
  return getAnswers().reduce(
    (score, answer, index) => {
      if (!answer) return score;
      return {
        correct: score.correct + (answer === quiz.questions[index].correct ? 1 : 0),
        wrong: score.wrong + (answer !== quiz.questions[index].correct ? 1 : 0),
      };
    },
    { correct: 0, wrong: 0 }
  );
}

function render() {
  const quiz = getQuiz();
  const { questions } = quiz;
  const question = questions[state.currentIndex];
  const selectedAnswer = getAnswers()[state.currentIndex];
  const score = getScore();
  const answered = score.correct + score.wrong;
  const percent = Math.round((answered / questions.length) * 100);

  elements.progressLabel.textContent = `Question ${Math.min(state.currentIndex + 1, questions.length)} of ${questions.length}`;
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
  elements.correctCount.textContent = score.correct;
  elements.wrongCount.textContent = score.wrong;
  elements.remainingCount.textContent = questions.length - answered;
  elements.questionNumber.textContent = `Question ${String(state.currentIndex + 1).padStart(2, "0")}`;
  elements.topicPill.textContent = quiz.topics?.[0] || "Academic";
  elements.questionText.textContent = question.question;
  elements.options.replaceChildren();

  Object.entries(question.options).forEach(([letter, text]) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "option";
    option.disabled = Boolean(selectedAnswer);
    option.innerHTML = `<span class="option-letter">${letter}</span><span>${text}</span>`;
    option.addEventListener("click", () => selectAnswer(letter));
    if (selectedAnswer) {
      if (letter === question.correct) option.classList.add("correct");
      if (letter === selectedAnswer && selectedAnswer !== question.correct) option.classList.add("wrong");
    }
    elements.options.append(option);
  });

  elements.feedback.innerHTML = selectedAnswer
    ? selectedAnswer === question.correct
      ? `<strong>Correct!</strong> ${question.explanation || ""}`
      : `<strong>Not quite.</strong> The correct answer is ${question.correct}. ${question.explanation || ""}`
    : "";
  elements.previousButton.disabled = state.currentIndex === 0;
  elements.nextButton.disabled = !selectedAnswer;
  elements.nextButton.textContent =
    state.currentIndex === questions.length - 1
      ? "See results"
      : selectedAnswer
        ? "Next question →"
        : "Choose an answer";
}

function selectAnswer(letter) {
  if (getAnswers()[state.currentIndex]) return;
  getAnswers()[state.currentIndex] = letter;
  saveProgress();
  render();
}

function focusOption(offset) {
  const options = [...elements.options.querySelectorAll(".option:not(:disabled)")];
  if (!options.length) return;

  const currentIndex = options.indexOf(document.activeElement);
  const nextIndex =
    currentIndex === -1
      ? offset > 0
        ? 0
        : options.length - 1
      : (currentIndex + offset + options.length) % options.length;
  options[nextIndex].focus();
}

function handleKeyboard(event) {
  if (elements.questionCard.classList.contains("hidden")) return;
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    focusOption(event.key === "ArrowDown" ? 1 : -1);
    return;
  }

  if (event.key === " " && document.activeElement?.classList.contains("option")) {
    event.preventDefault();
    document.activeElement.click();
    return;
  }

  if (event.key === "Enter" && getAnswers()[state.currentIndex]) {
    event.preventDefault();
    nextQuestion();
  }
}

function nextQuestion() {
  if (!getAnswers()[state.currentIndex]) return;
  if (state.currentIndex === getQuiz().questions.length - 1) {
    showResults();
    return;
  }
  state.currentIndex += 1;
  saveProgress();
  render();
}

function previousQuestion() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    saveProgress();
    render();
  }
}

function showResults() {
  const score = getScore();
  const total = getQuiz().questions.length;
  const percent = Math.round((score.correct / total) * 100);
  elements.questionCard.classList.add("hidden");
  elements.completeCard.classList.remove("hidden");
  elements.completionSummary.textContent = `You scored ${score.correct} out of ${total} (${percent}%). ${score.wrong} ${score.wrong === 1 ? "answer was" : "answers were"} incorrect.`;
}

function resetQuiz() {
  if (!window.confirm("Reset your saved progress for this subject?")) return;
  state.currentIndex = 0;
  state.answers[state.subject] = Array(getQuiz().questions.length).fill(null);
  saveProgress();
  elements.completeCard.classList.add("hidden");
  elements.questionCard.classList.remove("hidden");
  render();
}

function switchSubject(subject) {
  state.subject = subject;
  state.currentIndex = Math.min(
    state.indices[subject] || 0,
    state.quizzes[subject].questions.length - 1
  );
  elements.subjectButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.subject === subject);
  });
  elements.completeCard.classList.add("hidden");
  elements.questionCard.classList.remove("hidden");
  render();
}

elements.nextButton.addEventListener("click", nextQuestion);
elements.previousButton.addEventListener("click", previousQuestion);
elements.resetButton.addEventListener("click", resetQuiz);
elements.restartButton.addEventListener("click", resetQuiz);
elements.subjectButtons.forEach((button) => {
  button.addEventListener("click", () => switchSubject(button.dataset.subject));
});
document.addEventListener("keydown", handleKeyboard);
loadQuiz();
