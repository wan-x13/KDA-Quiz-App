


/***
 * 
 * 
 * 
 * 
 * FIN DU TABLEAU
 * 
 * 
 * 
 * 
 */

// 

let displayStart = document.querySelector("#presentation");
let startQuiz = document.querySelector("#start");
let quizInfo = document.querySelector("#quiz");
let successParty = document.querySelector("#successParty");
let nextButton = document.querySelector('#next');
let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");
let questionZone = document.querySelector("#questions");
let checkAnswer = document.querySelector("#checkAnswer");



// Input values 
let timeValue = 60;
let countQuestion = 0;
let questionNumber = 1;
let userScore = 0;

let nameUser;
let emailUser;


const forms = document.querySelector(".needs-validation");

startQuiz.addEventListener('click', function(){

    nameUser = nameInput.value;
    emailUser = emailInput.value;
    

    showQuestions(0);
    displayStart.hidden = true;
    
    nextButton.disabled = true;

})

// function afficher questions  ---> if()

nextButton.addEventListener('click', function(){

 if(countQuestion < questions.length-1){

    countQuestion++;
    showQuestions(countQuestion);
    nextButton.disabled = true;
 }
 else{

   quizInfo.hidden = true;
   displayStart.hidden = true;
 }
})




function showQuestions(index){

    let questionTag = "<span>" + questions[index].question + "</span>";
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

        inputs[i].setAttribute("onchange", "optionChoose(this)");
    }

 
}


function optionChoose(answer){


    // Récuperation de la reponse de l'utilisateur
    let userAnswer = answer.textContent;
    console.log(userAnswer);
    let correctAnswer = questions[countQuestion].answer;
    let answerValue = document.querySelectorAll('.answer > .form-check-input') ;
  

    let element = answerValue.children;
    console.log(element);
    const allOptions = checkAnswer.querySelectorAll(".form-check .answer > input , label");
 


    // for (let i = 0; i<answerValue.length; i++){

    //     //  if(inputs[i].checked === true) break;
    //      userAnswer += answerValue[i].innerText;

    // }
//   console.log(userAnswer);

    // let allItems = checkAnswer.children;
    // console.log(allItems);


    if(userAnswer == correctAnswer){

        userScore += 1;
    }
    else
    {
        userScore = 0
    }
    

   for(let i = 0; i<allOptions.length; i++) allOptions[i].disabled = true;
    
    nextButton.disabled = false;


}

