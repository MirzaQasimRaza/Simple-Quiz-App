let questions = [
   {
        question: "What is the Capital of France?",
        options: ["Paris", "Lyon", "Monaco", "Rennes"],
        answer: "Paris"
    },
    {
        question: "What is the Name of Largest Ocean in the World?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the Name of the Closest Star to Earth?",
        options: ["TON-618", "Pluto", "Mars", "Sun"],
        answer: "Sun"
    },
    {
        question: "What is the Name of the First Man to Walk on the Moon",
        options: ["Joe Hendry", "Neil Armstrong", "Albert Dimario", "Robert Lewandowski"],
        answer: "Neil Armstrong"
    },
    {
        question: "What is the Name of the Largest Planet in our Solar System",
        options: ["Uranus", "Venus", "Jupiter", "Saturn"],
        answer: "Jupiter"
    }
];

// Select all the HTML Elements

const question = document.getElementById("myH3");
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
const submitbtn = document.getElementById("submit");

// Add CorrectCount, WrongCount, SelectedOption and CurrentQuestionIndex.

let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedOption = null;

// Function to clear all the styles of button(options)

function clearStyles(){
    [option1,option2,option3,option4].forEach((opt)=>{
        opt.classList.remove("selected","red","green");
    })
}

// Function to resetOptionClick (Here we are basically adding the selected class for our selected option)

function resetOptionClicks(){
    [option1,option2,option3,option4].forEach((opt)=>{
        opt.onclick = function(){
            selectedOption = opt;
            opt.classList.add("selected");
        }
    })
}

// Function to load the question and remove the classes of options first and at the end adding resetOption so that when you click the selected class is added

function loadQuestion(){
    clearStyles();
    selectedOption = null;
    let q = questions[currentQuestionIndex];
    question.innerHTML = q.question;
    option1.innerHTML = q.options[0];
    option2.innerHTML = q.options[1];
    option3.innerHTML = q.options[2];
    option4.innerHTML = q.options[3];
    resetOptionClicks();
}

// Adding event listener on submit button and applying the remaining logic

submitbtn.addEventListener("click",()=>{
    if(!selectedOption){
        alert("Please select an option and submit so that you can go to the next question!");
        return;
    } else {
        let currentQuestion = questions[currentQuestionIndex];
        let correctAnswer = currentQuestion.answer;

        if(selectedOption.innerText === correctAnswer){
            selectedOption.classList.remove("selected");
            selectedOption.classList.add("green");
            correctCount++;
        } else {
            selectedOption.classList.remove("selected");
            selectedOption.classList.add("red");

            [option1,option2,option3,option4].forEach((opt)=>{
                if(opt.innerText === correctAnswer){
                    opt.classList.add("green");
                }
            })
            wrongCount++;
        }
    }

    [option1,option2,option3,option4].forEach((opt)=> opt.onclick = null);


    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            loadQuestion();
        } else {
            document.querySelector(".container").innerHTML = `
            <h2> Quiz Finished! </h2>
            <p> Total Questions: ${questions.length} </p>
            <p> Correct Answers: ${correctCount} </p>
            <p> Wrong Answers: ${wrongCount} </p>
            <p> You Scored ${correctCount} Out Of ${questions.length} questions </p>
            `
        }
    },3000)
})

loadQuestion();