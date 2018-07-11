var questionArray = [
    { question: "Finish this statment: 'Two by two'...", a: "Hands of blue", b: "You've got glue", c: "We run the line", d: "Go on through", asked: false },
    { question: "What is the name of Mal's horse?", a: "Fred", b: "Joe", c: "Hey You", d: "Dickie", asked: false },
    { question: "What is the name of the crew's ship?", a: "Serenity", b: "Firefly", c: "Daisy", d: "Enterprise", asked: false },
    { question: "When the cast messed up a line on set, they would yell who's name?", a: "Summer", b: "Morena", c: "Nathan", d: "Alan", asked: false },
    { question: "Captain Malcomb Reynolds was played by:", a: "Nathan Fillion", b: "Alan Tudyk", c: "Adam Baldwin", d: "Sean Maher", asked: false },
    { question: "What is Kaylee's favorite fruit?", a: "Strawberries", b: "Apples", c: "Blue Berries", d: "Kiwi", asked: false },
    { question: "The two primary languages for the show were:", a: "English and Chinese", b: "English and Cantonese", c: "Klingon and Spanish", d: "English and Japanese", asked: false },
    { question: "River Tam was played by:", a: "Summer Glau", b: "Morena Baccarin", c: "Jewel Staite", d: "Gina Torres", asked: false },
    { question: "Firefly was considered a:", a: "Space Western", b: "Space Opera", c: "Future Drama", d: "Space Comedy", asked: false },
    { question: "Who was the creator of Firefly?", a: "Joss Whedon", b: "Jed Whedon", c: "Brandon Braga", d: "Ron Howard", asked: false },
    { question: "What was Jayne's reaction to seeing Inara with her female client?", a: "I'll be in my bunk", b: "She needs to get out more", c: "I didn't know she took female clients", d: "I thought the Senator was a guy.", asked: false },
    { question: "When Mal found out The Operator wasn't armed he:", a: "Shot him", b: "Challenged him to a duel", c: "Made him surrender at gunpoint", d: "Ran", asked: false },
    { question: "What was the name of Mal's wife", a: "Saffron", b: "Mrs. Malcomb Reynolds", c: "Jennifer", d: "Seren Jade", asked: false },
    { question: "What planet was the birthplace for the Reavers", a: "Miranda", b: "Earth", c: "Londinium", d: "Sihnon", asked: false },
    { question: "What is the governing body for the central planets", a: "Alliance", b: "Unified Planets", c: "Earth Consortium", d: "The Federation", asked: false },



];
//! Change question count asked.
var questionNumberRequested = 10;
var scoreRight = 0;
var scoreWrong = 0;

bootGame();
function bootGame() {
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

    $(startButton).on("click", function (event) {
        setupAndRunGame();
    });

}
function setupAndRunGame() {
    var questionQuantity;
    if (questionNumberRequested > questionArray.length) {
        questionQuantity = questionArray.length
    } else {
        questionQuantity = questionNumberRequested;
    }
    var questionCount = 1;

    // for (var i =0; i<=questionQuantity;i++){
    questionCardCreate(questionCount, questionQuantity);
    // }



}
function questionCardCreate(count, total) {
    if (count > total) {
        endGame();
        return false;
    }
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
    count++;

    var questionText = $("<div>");
    questionText.addClass("gameText").addClass("secondaryText").text(questionAsking.question);
    $(questionCard).append(questionText);

    var answers = Object.entries(questionAsking).slice(1, 5).map(entry => entry[1]);
    console.log(answers);
    // event.preventDefault();

    var answerContainer = $("<div>");
    answerContainer.addClass("gametext");
    $(questionCard).append(answerContainer);

    for (var i = 0; i < 4; i++) {
        before = Math.round(Math.random())
        var answerAdd = $("<p>")
        answerAdd.addClass("gameText").addClass("questionText").attr("id", "question" + i);
        answerAdd.text(answers[i]);
        if (before == 1) {
            $(answerContainer).prepend(answerAdd);
        } else {
            $(answerContainer).append(answerAdd);
        }
    }

    $(answerContainer).click(function (event) {
        if (event.target != this) {
            $(answerContainer).find('p').each(function () {

                $(this).removeClass("highlighted");
            });

            $(event.target).toggleClass('highlighted');
        }
    });

    var submitBtn = $("<button>");
    submitBtn.text("SUBMIT");
    submitBtn.addClass("gameButton");
    $(questionCard).append(submitBtn);

    $(submitBtn).on("click", function (event) {
        $(answerContainer).find('p').each(function () {
            if (this.classList.contains("highlighted")) {
                console.log(this.id);
                clearInterval(myInterval);
                if (this.id == "question0") {
                    questionRight(count, total);
                } else {
                    questionWrong(count, total);
                }
            }
        });
    });

    //Question Timer
    var time = 30;
    var questionTimeLeft = $("<div>");
    questionTimeLeft.addClass("gameText").addClass("titleText").text("Time Left: " + time);
    $(questionCard).append(questionTimeLeft);

    var myInterval = setInterval(questionTimer, 1000);

    function questionTimer() {
        time--;
        // console.log("Question Timer Called");
        $(questionTimeLeft).text("Time Left: " + time);
        if (time <= 0) {
            clearInterval(myInterval);
            timesUp(count, total);
        }
    }
}

function questionRight(count, total) {
    console.log("Question answered right");
    scoreRight++;
    $(".main").empty();
    var rightCard = $("<div>");
    rightCard.addClass("card");
    $(".main").append(rightCard);

    var rightTitle = $("<div>");
    rightTitle.addClass("titleText").addClass("gameText").text("THAT'S CORRECT!!!").css("padding-top", "20vw");
    $(rightCard).append(rightTitle);


    var rightInterval = setTimeout(rightTimer, 1000);

    console.log("Waiting...");
    function rightTimer() {
        questionCardCreate(count, total);
    }
}

function questionWrong(count, total) {
    console.log("Question answered wrong");
    scoreWrong++;
    $(".main").empty();
    var wrongCard = $("<div>");
    wrongCard.addClass("card");
    $(".main").append(wrongCard);

    var wrongTitle = $("<div>");
    wrongTitle.addClass("titleText").addClass("gameText").text("Sorry, you're incorrect.").css("padding-top", "20vw");
    $(wrongCard).append(wrongTitle);

    var wrongInterval = setTimeout(wrongTimer, 1000);


    console.log("Waiting...");
    function wrongTimer() {
        questionCardCreate(count, total);
    }
}

function timesUp(count, total) {
    console.log("Times up called");
    $(".main").empty();

    var timesUpCard = $("<div>");
    timesUpCard.addClass("card");
    $(".main").append(timesUpCard);

    var timesUpTitle = $("<div>");
    timesUpTitle.addClass("titleText").addClass("gameText").text("Sorry, you're out of time.").css("padding-top", "20vw");
    $(timesUpCard).append(timesUpTitle);


    scoreWrong++;

    var timesUpInterval = setTimeout(timesUpTimer, 2000);


    console.log("Waiting...");
    function timesUpTimer() {
        questionCardCreate(count, total);
    }
}

function getRandomQuestion(questionArr) {

    var questionNumber = Math.floor(Math.random() * ((questionArr.length - 1) - 0 + 1))
    count = 0;
    console.log(questionNumber + " : " + questionArr[questionNumber].asked)

    while (questionArr[questionNumber].asked) {
        questionNumber++;
        if (questionNumber >= questionArr.length) {
            questionNumber = 0;
        }

        count++;
        if (count >= questionArr.length) {
            console.log("All questions asked");
            return false;

        }

    }
    questionArray[questionNumber].asked = true;

    return questionArr[questionNumber];
}

function endGame() {
    console.log("endGame Called");
    $(".main").empty();
    var endCard = $("<div>");
    endCard.addClass("card");
    $(".main").append(endCard);

    var endTitle = $("<div>");
    endTitle.addClass("titleText").addClass("gameText").text("Thank you for playing!!");
    $(endCard).append(endTitle);

    var score = $("<div>");
    score.addClass("gameText").addClass("secondaryText");
    score.append("<p>Right: " + scoreRight + "</p>");
    score.append("<p>Wrong: " + scoreWrong + "</p>");
    $(endCard).append(score);

    var againBtn = $("<button>");
    againBtn.text("Play Again?");
    againBtn.addClass("gameButton");
    $(endCard).append(againBtn);

    $(againBtn).click(function () {
        scoreRight = 0;
        scoreWrong = 0;
        for(x in questionArray){
            questionArray[x].asked = false;
        }
        setupAndRunGame();
    })


}