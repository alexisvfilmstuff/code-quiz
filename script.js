// calls upon document elements of score, timer, questions 
let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");

// sets changing values for the test, score, and timer 
var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 15;
var questionSecElapsed = 0;
var questionInterval;


//starts function of quiz initialization 
init();

// function to display instructions
function init() {
  clearDetails();
  reset();

  // creates Heading element for main page
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "This game gives you the opportunity to take a time quiz!";

  // instructions of the quiz
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " You will have 5 seconds to answer each question. If you answer correctly you will score points. The quicker you answer the more points you will score. If you score incorrectly you will not lose points, but you will be penalized time.";

  // creates button to start the quiz
  let startJsQuiz = document.createElement("button");
  startJsQuiz.setAttribute("id", "startJSQuiz");
  startJsQuiz.setAttribute("class", "btn btn-secondary");
  startJsQuiz.textContent = "Start Javascript Quiz";


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startJsQuiz);

  // event listener for click on button 
  startJsQuiz.addEventListener("click", function () {
    quizType = "Java Script";
    playQuiz(jsQuestions);
  });
}

// function to clear details once going to next question or answers it wrong 
function clearDetails() {
  mainEl.innerHTML = "";
}

// resets values once game ends 
function reset() {
  quizType = "";
  score = 0;

  gameDuration = 0;
  gameSecElapsed = 0;
  gameInterval;

  questionDuration = 15;
  questionSecElapsed = 0;
  questionInterval;
}

//start game
function playQuiz(questionSet) {
  if (test) { console.log("--- playQuiz ---"); }
  // select quiz randomize questions

  quiz = setUpQuestions(questionSet);

  // displays timers
  timerTab.setAttribute("style", "visibility: visible;");

  // start timers values
  gameDuration = quiz.length * 15;
  if (test) { console.log("duration g,q:", gameDuration, questionDuration); }

  startGameTimer();
  renderTime();

  //go to first question
  presentQuestion();
}

// function to get random question out of array
function setUpQuestions(arr) {
  if (test) { console.log("--- setUpQuestions ---"); }

  let ranQuest = [];

  for (let i = 0; i < arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

// function to render screen with question and timer command for questions not test entirely 
function presentQuestion() {
  if (test) { console.log("--- presentQuestion ---"); }
  questionSecElapsed = 0;
  if (quiz.length === 0) {
    endOfGame();
    return;
  }

 
  curQuestion = quiz.pop();

  //resets front end to get random questions after selecting
  clearDetails();

  //build out container for question to be displayed on screen 
  let question = document.createElement("h1");
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  // create list as container to listen for answers
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id", "choiceBox");
  mainEl.appendChild(choiceBox);

  //adds answers to screen
  for (let i = 0; i < curQuestion.choices.length; i++) {
    let listChoice = document.createElement("li");
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id", "questionNum-" + i);
    listChoice.textContent = curQuestion.choices[i];
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur", curQuestion); }

  choiceBox.addEventListener("click", function () {
    scoreAnswer(curQuestion);
  });
}


// function when selecting a correct or wrong answer to show li 
function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---"); }
  var e = event.target;
  if (e.matches("li")) {
    let selectedItem = e.textContent;
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    if (selectedItem === cur.answer) {
      score += questionDuration - questionSecElapsed;
    } else {
      if (test) { console.log("wrong answer"); }
      gameDuration -= 10;
    }
    if (test) { console.log("sselected ", selectedItem); }
    showAnswers(cur);
  }
}
  
  // function to show list of answers 
function showAnswers(cur) {
  if (test) { console.log("--- showAnswer ---"); }
  if (test) { console.log("sa qanda", cur); }
  if (test) { console.log("sselected ", selectedItem); }


  // shows choices for the question and shows if correct or not by colored labels 
  for (let i = 0; i < cur.choices.length; i++) {
    if (test) { console.log("sa in for ", i); }

    let questid = "#questionNum-" + i;
    let questrow = document.querySelector(questid);

    if (test) { console.log("saf selected" + selectedItem + "<"); }
    if (test) { console.log("saf color test >" + cur.choices[i] + "<"); }

    if (cur.choices[i] !== cur.answer) {
      if (test) { console.log("color test flase"); }
      questrow.setAttribute("style", "background-color: red");
    } else {
      if (test) { console.log("color test true"); }
      questrow.setAttribute("style", "background-color: green");
    }
  }
  setTimeout(presentQuestion, 500);
}

// function to set time for game timer
function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }
  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}

// function to render timer on page
function renderTime() {
  gameTimerEl.textContent = gameDuration - gameSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;

  if ((questionDuration - questionSecElapsed) < 1) {
    gameDuration -= 10;
    if (test) { console.log("too slow"); }
    presentQuestion();
  }

  if ((gameDuration - gameSecElapsed) < 1) {
    endOfGame();
  }
}

// function to start the timer and sets elapsed time 
function startGameTimer() {
  if (test) { console.log("--- startGameTimer ---"); }
  setGameTime();

  gameInterval = setInterval(function () {
    gameSecElapsed++;
    questionSecElapsed++;
    renderTime();
  }, 1000);
}

// function to stop timer when game ends also resets value 
function stopTime() {
  if (test) { console.log("--- stopTime --- "); }
  gameSeconds = 0;
  questionSeconds = 0;
  clearInterval(gameInterval);
}

// function to show player score individually after game ends
function endOfGame() {
  if (test) { console.log("--- endOfGame ---"); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "GAME OVER - I hope you have enjoyed this";

  // creates elements with the instructions for the game
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score is " + score;

  // creates button to start the game
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play again";

  // put name for scoreboard submission 
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for", "userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "userInitials");
  initialsInput.setAttribute("name", "userInitials");
  initialsInput.setAttribute("minlength", "3");
  initialsInput.setAttribute("maxlength", "3");
  initialsInput.setAttribute("size", "3");


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(par);
  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function () {
    initialsInput.value = initialsInput.value.toUpperCase();
    if (initialsInput.value.length === 3) {

      // creates score value 
      let thisScore = [{ type: quizType, name: initialsInput.value, score: score }];

      // get highscores from memory
      let storedScores = JSON.parse(localStorage.getItem("highScores"));
      if (test) { console.log("storedScore", storedScores); }

      if (storedScores !== null) {
        storedScores.push(thisScore[0]);
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function highScores() {
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  // grabs scores from local storage
  let storedScores = JSON.parse(localStorage.getItem("highScores"));

  // element text of scoreboard 
  let heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Top Quiz Players";

  mainEl.appendChild(heading);

  // orders scores based on highest score to lowest score
  if (storedScores !== null) {
    storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

    // displays scoreboard 
    let numScores2Display = 5;
    if (storedScores.length < 5) {
      numScores2Display = storedScores.length;
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
      mainEl.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent = "Your Initials Here!"
    mainEl.appendChild(p);
  }


  // start game button
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play!";

  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);