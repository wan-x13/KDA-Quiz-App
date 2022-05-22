

const displayStart = document.querySelector("#presentation");
const startQuiz = document.querySelector("#start");
const quizInfo = document.querySelector("#quiz");
const successParty = document.querySelector("#successParty");
const nextButton = document.querySelector('#next');
const nameInput = document.querySelector("#name");
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

startQuiz.addEventListener('click', function(){

    userName = nameInput.value;
    console.log(userName);
    emailUser = emailInput.value;
    getQuestions(0);
    setTime(timeValue);
    setUpdateProgress();
    displayStart.hidden = true;
    quizInfo.hidden = false;
    
    nextButton.disabled = true;

})

// function afficher questions  ---> if()

nextButton.addEventListener('click', function(){

 if(countQuestion < questions.length-1){

    countQuestion++;
    questionNumber++;
    getQuestions(countQuestion);
    setQuestionCounter(questionNumber);
    clearInterval(counterTime);
    timeCount.removeAttribute("style");
    setTime(timeValue);
    setUpdateProgress();
    nextButton.disabled = true;
 

 }
 else{

   getResult();
 }
});


homePageButton.addEventListener('click' , function(){


    successParty.hidden = true;
    displayStart.hidden = false;
    userScore = 0;
    timeValue = 60;
    clearInterval(counterTime);
    getQuestions(countQuestion);
    setQuestionCounter(timeValue);

   
});

exitButton.addEventListener('click', function(){

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
    

   for(let i = 0; i<allOptions.length; i++) allOptions[i].disabled = true;
    
    nextButton.disabled = false;


}

// setTime function

function setTime(time){

    const allOptions = checkAnswer.querySelectorAll(".form-check .answer > input , label");

    counterTime = setInterval(()=>{

    timeCount.innerText = time;
    time--;
    if(time < 10){

        timeCount.innerText = "0" + time;

    }    
    if(time <= 0){
        timeCount.innerText = "Time off";
        timeCount.style.color = "red";
        for(let i = 0; i<allOptions.length; i++) allOptions[i].disabled = true;
        nextButton.disabled = false;
    }
    
    
   

   }, 1000)
}

let i = 0;
function setUpdateProgress(){

  if(i == 0){
    
    i = 1;
    let widthProgress = 120;
   
    idProgress = setInterval(()=>{

        if( widthProgress<= 0){
  
          clearInterval(idProgress);
          i = 0;
        }
        else {
  
          widthProgress--;
          progress.style.width = widthProgress + "%";
        }
  
      }, 500)
   
  }
   
   
}


let iconFalse = "<i class='fas fa-times'></i>";

function getResult(){


  displayStart.hidden = true;
  quizInfo.hidden = true;

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
