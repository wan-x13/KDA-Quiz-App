


  

forms.addEventListener('submit', function(event){
    event.preventDefault();

    fields.forEach((field)=>{
        let valid = false;
        if(!isRequired(field.value.trim())){

            field.classList.add('invalid');
            field.nextElementSibling.innerText = 'ce champs nde doit pas être vide';
         
            valid = false;

        }
        else{
      userName = username.value;
      emailUser = email.value;
      getQuestions(0);
      setTime(timeValue);
      displayStart.style.display = "none";
      quizInfo.style.display = "flex";
      nextButton.disabled = true;
          
        }


           

        

    })
    
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
    
