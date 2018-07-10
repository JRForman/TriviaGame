var questionArray=[
{ question:"One", a:"a",b:"b",c:"c", d:"d", asked: false},
{ question:"Two", a:"a",b:"b",c:"c", d:"d", asked: false},
{ question:"Three", a:"a",b:"b",c:"c", d:"d", asked: false},
{ question:"Four", a:"a",b:"b",c:"c", d:"d", asked: false},

];
//! Change question count asked.
var questionNumberRequested = 4;
bootGame();
function bootGame(){
    console.log("bootGame called");
    $(".main").empty();
    var startCard = $("<div>");
    startCard.addClass("card");
    $(".main").append(startCard);

    var startTitle = $("<div>");
    startTitle.addClass("gameText").addClass("titleText").text("Welcome to Serenity Trivia");
    $(startCard).append(startTitle);

    var startText = $("<div>");
    startText.addClass("gameText").addClass("secondaryText").text("Please press start to begin.");
    $(startCard).append(startText);

    var startButton = $("<button>");
    startButton.addClass("gameButton").addClass("gameText").text("START");
    $(startCard).append(startButton);

    $(startButton).on("click", function(event) {
        setupAndRunGame();
    });

}
function setupAndRunGame(){
    var questionQuantity;
    if(questionNumberRequested > questionArray.length){
        questionQuantity = questionArray.length
    }else{
        questionQuantity = questionNumberRequested;
    }
    var questionCount =0;

    // for (var i =0; i<=questionQuantity;i++){
        questionCard(questionCount, questionQuantity);
    // }
    
    

}
function questionCard(count, total){
    console.log("questionCard called")
    $(".main").empty();
    var questionCard = $("<div>");
    questionCard.addClass("card");
    $(".main").append(questionCard);

    var title = $("<div>");
    questionTitleText = "Question: " + count + " of " + total;
    title.addClass("gameText").addClass("titleText").text(questionTitleText);
    $(questionCard).append(title);

    var questionAsking = getRandomQuestion(questionArray);
    

    var questionText = $("<div>");
    questionText.addClass("gameText").addClass("secondaryText").text(questionAsking.question);
    $(questionCard).append(questionText);
    console.log(questionAsking);
    
    var answerA = questionAsking.a;
    var answerB = questionAsking.b;
    var answerC = questionAsking.c;
    var answerD = questionAsking.d;
    
  
    // event.preventDefault();

    var answerContainer = $("<form>");
    answerContainer.addClass("gametext");
    $(questionCard).append(answerContainer);

    for (var i =0; i<4; i++){
        before = Math.round(Math.random())
        
    }



    //Question Timer
    var time = 5;
    var questionTimeLeft = $("<div>");
    questionTimeLeft.addClass("gameText").addClass("titleText").text("Time Left: " + time);
    $(questionCard).append(questionTimeLeft);
    
   


    var myInterval = setInterval(questionTimer, 1000);

    function questionTimer() {
        time--;
        console.log("Question Timer Called");
        $(questionTimeLeft).text("Time Left: " + time);
        if (time<=0){
            clearInterval(myInterval);
            timesUp();
        }
}





}

function timesUp(){
    console.log("Times up called");
}

function getRandomQuestion(questionArr){

    var questionNumber = Math.floor(Math.random() * ((questionArr.length - 1) - 0 + 1))
    count =0;
    console.log(questionNumber+" : "+ questionArr[questionNumber].asked)

    while (questionArr[questionNumber].asked){
        questionNumber++;
        if(questionNumber>=questionArr.length){
            questionNumber=0;
        }
        
        count++;
        if(count>=questionArr.length){
            console.log("All questions asked");
            return false;
            
        }
        
    }
    questionArray[questionNumber].asked= true;
    
    return questionArr[questionNumber];
}
