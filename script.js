/**
 * 
 * 
 */

let displayStart = document.querySelector("#presentation");
let startQuiz = document.querySelector("#start");
let quizInfo = document.querySelector("#quiz");
let  successParty = document.querySelector("#successParty");
let nextButton = document.querySelector('#next');
let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");


let nameUser;
let emailUser;


startQuiz.addEventListener('click' , function(){

nameUser = nameInput.value;
emailUser = emailInput.value;

console.log(nameUser);
console.log(emailUser);

displayStart.hidden = true;

nextButton.disabled = true;

})
