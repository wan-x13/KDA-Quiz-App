


  
forms.addEventListener('submit', function(event){
  event.preventDefault();

  fields.forEach((field)=>{

    
    //   else{
   
        
    //   }
    if(field.value.trim() === ''){

      field.classList.add("invalid");
      field.nextElementSibling.innerText = "veuillez remplir ce champs"; 
    }
    else{

      //  field.classList.add("success");


    if(field.type == "email"){

      let format =  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 
      if(!format.test(field.value)){

        field.classList.add('invalid');
        field.nextElementSibling.innerText = "l'email n'est pas au bon  format";
      }
      else{

        field.classList.add('success');

         userName = username.value;
         emailUser = email.value;
         getQuestions(0);
         setTime(timeValue);
         displayStart.style.display = "none";
         quizInfo.style.display = "flex";
         nextButton.disabled = true;

      }

       
     }
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
