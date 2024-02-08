const questionElement = document.querySelector(".question");
const answerButtons = document.querySelectorAll(".btn");
const nextButton = document.querySelector(".next_btn");
const scoreTable = document.querySelector(".quiz_footer");
const playAgain = document.querySelector(".again_btn");
const timerScore = document.querySelector(".timer");
let questions = [];
let questionNumber = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

let timer;
const timePerQuestion = 10; 
let timeLeft = timePerQuestion;
function startTimer() {
    clearInterval(timer);
    timeLeft = timePerQuestion;
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timer);
            handleTimeUp();
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    if (!scoreTable.style.display || scoreTable.style.display === "none") {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerScore.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    } else {
        timerScore.textContent = "";
    }
}

function padZero(num) {
    return num < 10 ? "0" + num : num;
}

function handleTimeUp() {
    nextButton.click(); 
}

document.querySelector(".start_quiz").addEventListener("click", async () => {
    document.querySelector(".quiz").classList.add("active");
    await loadQuestions();
    displayQuestion();
    startTimer();
});

async function loadQuestions() {
    await fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple")
        .then(response => response.json())
        .then(data => {
            questions = data.results;
        });

    console.log(questions);
}

let test;

for (let i = 0; i < answerButtons.length; i++) {
    test = () => {
        handleAnswerClick(answerButtons[i])
    }
    answerButtons[i].addEventListener("click", test);
}


function displayQuestion() {
    const currentQuestion = questions[questionNumber];
    questionElement.innerHTML = `${questionNumber + 1}. ${currentQuestion.question}`;
    
    let count = 0; 
    
    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    const shuffledOptions = shuffle(options);
    console.log(answerButtons);
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].innerText = shuffledOptions[i];
        answerButtons[i].style.background = "";
        answerButtons[i].disabled = false;
        answerButtons[i].classList.remove("disabled");
        // test = () => {
            // handleAnswerClick(answerButtons[i])
        //}
        answerButtons[i].addEventListener("click", test);
    }


    nextButton.style.display = "none";
}

function handleAnswerClick(button) {
    console.log('clicked');
    const selectedAnswer = button.innerText;
    const currentQuestion = questions[questionNumber];
    if (selectedAnswer === currentQuestion.correct_answer) {
        button.style.background = "green";
        correctAnswers++;
        console.log(correctAnswers);
    } else {
        button.style.background = "red";
        incorrectAnswers++;
        console.log(incorrectAnswers);
        for (let i = 0; i < answerButtons.length; i++) {
            if (answerButtons[i].innerText === currentQuestion.correct_answer) {
                answerButtons[i].style.background = "green";
            }
        }
    }

    disableAnswerButtons();
    nextButton.style.display = "flex";
}

function disableAnswerButtons() {
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeEventListener("click", test,false);
        answerButtons[i].disabled = true;
        answerButtons[i].classList.add("disabled");
    }
}

nextButton.addEventListener("click", () => {
    questionNumber++;
    startTimer()
    if (questionNumber < questions.length) {
        displayQuestion();
    } else {
        showScore();
    }
});

playAgain.addEventListener("click", async () => {
    questionNumber = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    clearInterval(timer);
    startTimer()
    scoreTable.style.display = "none";
    await loadQuestions();
    displayQuestion();
});

function showScore() {
    scoreTable.style.display = "flex";
    document.querySelector(".total_score").innerText = `Questions: 10`;
    document.querySelector(".correct_score").innerText = `Correct Answers: ${correctAnswers}`;
    document.querySelector(".incorrect_score").innerText = `Incorrect Answers: ${incorrectAnswers}`;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


























































































// const questionElement = document.querySelector(".question");
// const answerButton = document.querySelectorAll(".btn");
// const next = document.querySelector(".next_btn");
// const scoreTable = document.querySelector(".score_table")
// let versions;
// let questionNumber = 1;
// let stage = 0;


// document.querySelector(".start_quiz").addEventListener("click",()=>{
//     document.querySelector(".quiz").classList.add("active")
    
//     function addQuestion() {
//         fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple")
//         .then(response => response.json())
//         .then(data => {
            




//             //function ele dynamic olsun
//             questionElement.innerHTML = `${questionNumber}.${data.results[stage].question}`
//             versions = [...data.results[stage].incorrect_answers,data.results[stage].correct_answer]
//             let shuffle_arr = shuffle(versions)

            
//             for (let i = 0; i < answerButton.length; i++) {
//                 answerButton[i].innerHTML = shuffle_arr[i]
                
                
//                 answerButton[i].addEventListener("click",()=> {
//                     if (shuffle_arr[i] == data.results[stage].correct_answer) {
//                         answerButton[i].style.background = "green"
//                     } else {
//                         answerButton[i].style.background = "red"
//                     }
//                     next.style.display = "flex"
//                 })

//                 answerButton[i].removeEventListener("click",() => {

//                 })
                
//             }

            


            
//             next.addEventListener("click",() => {
                
//                 questionElement.innerHTML = `${questionNumber}.${data.results[stage].question}`
//                 versions = [...data.results[stage].incorrect_answers,data.results[stage].correct_answer]
                

//                 var shuffle_arr = shuffle(versions)

//                 for (let i = 0; i < answerButton.length; i++) {

//                     answerButton[i].innerHTML = shuffle_arr[i]
//                     answerButton[i].addEventListener("click",()=> {
//                         if (shuffle_arr[i] == data.results[stage].correct_answer) {
//                             answerButton[i].style.background = "green"
//                         } else {
//                             answerButton[i].style.background = "red"
//                         }
                        
//                         next.style.display = "flex"
//                     })
                    
//                 }
//                 if (questionNumber === 10) {
//                     next.addEventListener("click",()=>{
//                         scoreTable.style.display = "flex"
//                      })
//                 }
                
//             })
//         })
//     }
    
    

//     function shuffle(array) {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
//     }
    
    
    
//     addQuestion()
// })











