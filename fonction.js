
const displayStart = document.querySelector("#presentation");
const startQuiz = document.querySelector("#start");
const quizInfo = document.querySelector("#quiz");
const successParty = document.querySelector("#successParty");
const nextButton = document.querySelector('#next');

const emailInput = document.querySelector("#email");
const questionZone = document.querySelector("#questions");
const checkAnswer = document.querySelector("#checkAnswer");
const timeCount =document.querySelector("#timeCount");
const userNameZone = document.querySelector(".name_user");
const emailZone = document.querySelector(".email_user");
const homePageButton = document.querySelector(".accueil > .btn"); 
const exitButton = document.querySelector(".exit_next > .exit ");
const questionCountNumber = document.querySelector(".questionCountNumber");
const countPageSucced = document.querySelector(".count_page_succed");
const progress = document.querySelector("#progressBar");


// Input values 
let timeValue = 60;
let countQuestion = 0;
let questionNumber = 1;
let userScore = 0;
let counterTime ;
let idProgress;

let numberPerQuestionSucced = 0
let userName;
let emailUser;


const forms = document.querySelector(".needs-validation");
const fields = document.querySelectorAll("input[name='username'], input[name='email']");
const msg = document.querySelectorAll(".containt > .msg");

const username = document.querySelector("input[name ='username'");
const email = document.querySelector("INPUT[name='email'");


// function validation
const isRequired = value => value === '' ? false : true;
const isLength =  (length, min, max) => length < min || length >max ? false : true;

const isEmailValid = (email) =>{
  let format =  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 
     
  return format.test(email);

}



  



function getQuestions(index){

    let questionTag = questions[index].question ;
    let optionTag  = '<div class= "container-radio ">'+questions[index].idInput[0] + '<label for="response1" >' 
    + questions[index].options[0] +'</label></div>'

    +'<div class=" container-radio  ">'+questions[index].idInput[1] + '<label for="response2" >' 
    + questions[index].options[1] +'</label></div>'

    +'<div class=" container-radio  ">'+questions[index].idInput[2] + '<label for="response3" >' 
    + questions[index].options[2] +'</label></div>'

    +'<div class=" container-radio ">'+questions[index].idInput[3] + '<label for="response4" >' 
    + questions[index].options[3] +'</label></div>';
    questionZone.innerHTML = questionTag;
    checkAnswer.innerHTML = optionTag;

    const inputs = checkAnswer.querySelectorAll("input");
   

    for(let i = 0; i<inputs.length; i++){

        inputs[i].setAttribute("onchange", "getOption(this)");
    }

}

function getOption(answer){


    // Récuperation de la reponse de l'utilisateur
   
 
    let correctAnswer = questions[countQuestion].answer;
    const allOptions = checkAnswer.querySelectorAll(".container-radio> input , label");
  
    const allInputs = checkAnswer.querySelectorAll(".container-radio > input[name='reponse'] ");

    

    for(const element of allInputs){

        if(element.checked){


            userAnswer = element.value;
         
            element.style.backgroundColor = "#028A3D";
      
            break;
        }
    }
    userAnswer = parseInt(userAnswer);
  
    if(userAnswer == correctAnswer){

        userScore += 1;
        numberPerQuestionSucced += 1;
 
    }
    
  //  for(let i = 0; i<allOptions.length; i++) allOptions[i].disabled = true;
    
    nextButton.disabled = false;

}

// setTime function

function setTime(time){

    countQuestion ;

    const allOptions = checkAnswer.querySelectorAll(".container-radio> input , label");


    counterTime = setInterval(()=>{

    timeCount.textContent = time;
    time--;
    let progressWith = time/60 *100;

    if( time > 0){

      progress.style.width = progressWith + "%";
    }

    if(time < 10){

        timeCount.innerText = "0" + time;
    }    
    if(time == 0){

      clearInterval(counterTime);
        timeCount.innerText = "Time off";
        timeCount.style.color = "red";
        progress.style.width = "0%";
        nextQuestion();   
    }
   }, 1000)
}

function getResult(){

  let iconFalse = ' <svg><circle cx="50" cy="50" r="50"/><line class="line1" x1="20" x2="65" y1="20" y2="65"/><line class="line2" x1="20" x2="65" y1="65" y2="20"/></svg>';

  displayStart.style.display = "none";
  quizInfo.style.display = "none";
  const iconZone = document.querySelector(".icon");
  userNameZone.innerText= userName;
  emailZone.innerText= emailUser;
  countPageSucced.innerText = numberPerQuestionSucced + "/15";
 
  if(userScore < 8){
    
    iconZone.innerHTML = iconFalse;

  }
  else{

    const svgImg = document.createElement("img");
    svgImg.src = "check-circle.svg";
    iconZone.appendChild(svgImg);
  }

}

// function question compteur

function setQuestionCounter(index){


    let numberPerQuestion = index + "/" + questions.length;

    questionCountNumber.innerText = numberPerQuestion;
}

function nextQuestion(){

  if(countQuestion < questions.length-1){

    countQuestion++;
    questionNumber++;
    getQuestions(countQuestion);
    setQuestionCounter(questionNumber);
    clearInterval(counterTime);
    timeCount.removeAttribute("style");
    setTime(timeValue);
    nextButton.disabled = true;
 
 }
 else{
  successParty.style.display = "flex";
  getResult();
 }
  
}

// fonction de validation du formulaire


