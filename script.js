
const displayStart = document.querySelector("#presentation");
const startQuiz = document.querySelector("#start");
const quizInfo = document.querySelector("#quiz");
const successParty = document.querySelector("#successParty");
const nextButton = document.querySelector('#next');
const nameInput = document.querySelector("#Name");
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

let numberPerQuestionSucced = 0;



let userName;
let emailUser;


const forms = document.querySelector(".needs-validation");
const fields = document.querySelectorAll("input[name='Name'], input[name='email']");



forms.addEventListener("submit", function(event){

  event.preventDefault();
  let valid = false;
  const msg = document.querySelectorAll(".containt > .msg");
  console.log(msg);

 fields.forEach((field) => {
  
 if(field.value.trim() === ""){

    field.classList.add('invalid'); 
    field.nextElementSibling.textContent = 'Veuillez remplir ce champs';
  }
  else if(field.type == "email"){

    let format =  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 

    if(!field.value.match(format)){

     valid = false;
    }
    else{

      valid =  true;
 
    }
    if(valid == true){

    userName = nameInput.value;
    console.log(userName);
    emailUser = emailInput.value;
    console.log(emailUser);
    getQuestions(0);
    setTime(timeValue);
    displayStart.style.display = "none";
    quizInfo.style.display = "flex";
    
    nextButton.disabled = true;
    }
  }
 
});


})


nextButton.addEventListener('click', function(){
   nextQuestion();
 
});

homePageButton.addEventListener('click' , function(){

  window.location.reload();
  

});

exitButton.addEventListener('click', function(){

  
successParty.style.display = "flex";
getResult();

})

function getQuestions(index){

    let questionTag = questions[index].question ;
    let optionTag  = '<div class= "form-check border rounded"><div class="answer">'+questions[index].idInput[0] + '<label for="response1" class="form-check-label">' 
    + questions[index].options[0] +'</label></div></div>'

    +'<div class="form-check border  rounded"><div class="answer">'+questions[index].idInput[1] + '<label for="response2" class="form-check-label">' 
    + questions[index].options[1] +'</label></div></div>'

    +'<div class="form-check border  rounded"><div class="answer">'+questions[index].idInput[2] + '<label for="response3" class="form-check-label">' 
    + questions[index].options[2] +'</label></div></div>'

    +'<div class="form-check border  rounded"><div class="answer">'+questions[index].idInput[3] + '<label for="response4" class="form-check-label">' 
    + questions[index].options[3] +'</label></div></div>';
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
    const allOptions = checkAnswer.querySelectorAll(".form-check .answer > input , label");
    const allInputs = checkAnswer.querySelectorAll(".form-check .answer > input[name='reponse'] ");

    for(const element of allInputs){

        if(element.checked){

            userAnswer = element.value;
      
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

    const allOptions = checkAnswer.querySelectorAll(".form-check .answer > input , label");

    counterTime = setInterval(()=>{

    timeCount.innerText = time;
    time--;
    let progressWith = time/60 *100;


    if( time > 0){

      progress.style.width = progressWith + "%";
    }

    if(time < 10){

        timeCount.innerText = "0" + time;
    }    
    if(time <= 0){
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

  successParty.style.display = "flex"
  getResult();
 }
  
}