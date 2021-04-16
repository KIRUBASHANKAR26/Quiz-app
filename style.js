var quizlist;

var mainContainer = $("#main-container");
var quizContainer = $("#quiz-container");

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",function(response){
    quizlist = response;
    renderQuestion(quizlist);
})

function renderQuestion(quizlist){
var quizForm = $("<form>");
quizForm.addClass("quizForm");
quizContainer.append(quizForm);
for (var i = 0; i < quizlist.length; i++) {
       var questionContainer = $("<div>");
       questionContainer.addClass("question-container");
       quizForm.append(questionContainer);

       var question = $("<h3>").text("Q" + quizlist[i].id + "." + " " + quizlist[i].question);
       questionContainer.addClass("question");
       questionContainer.append(question);

       var radioContainer = $("<div>");
       radioContainer.addClass("radio-container");
       questionContainer.append(radioContainer);

       var radioGroup = quizlist[i].options;
       for (var j = 0; j < radioGroup.length; j++) {

            var radioOptionContainer = $("<div>");
            radioOptionContainer.addClass("radio-option-container");
            radioContainer.append(radioOptionContainer);

            var radioLabel = $("<label>");
            radioOptionContainer.append(radioLabel);

            var radioInput = $("<input>");
            radioInput.prop({
                type: 'radio',
                name:i,
                value:radioGroup[j]
            })
            var radioInputText = $("<span>").html(radioGroup[j]);//options render;
            radioLabel.append(radioInput,radioInputText);
        }
        var questionBorder = $("<div>");
        questionBorder.addClass("question-border");
        quizForm.append(questionBorder);
    }
    var formSubmit = $("<button>").text("Submit");
   formSubmit.addClass("form-submit");

    quizForm.append(formSubmit);
    var userAnswer = [];

       formSubmit.click(function(e) {
           for(var k=0; k<quizlist.length;k++){
                var answer = document.getElementsByName(k);
                for (let l = 0; l < radioGroup.length; l++) {
                    if(answer[l].checked === true){
                        userAnswer.push(l+1); // answer .checked and which presses number
                    } 
                }
           }
           checkResults(userAnswer);
           e.preventDefault();
       })
}
function checkResults(userAnswer){
    var realAnswer = quizlist;
    var score = 0;
    for(var i=0; i<quizlist.length; i++){
        //console.log(userAnswer[i]);
        if(quizlist[i].answer === userAnswer[i]){
            score+=1;
        }
    }
    var resultArea = $("<div>").addClass("result-area");
    mainContainer.append(resultArea);
    resultArea.css({
        "display":"block",
        "position":"fixed",
        "bottom":"0",
        "left":"0"
    })

    var resultContainer = $("<div>").addClass("result-container");
    mainContainer.append(resultContainer);
    resultContainer.css({
        "display":"block",
        "position":"fixed",
        "bottom":"25%",
        "left":"25%"
    })

    var resultHeading = $("<h1>").text("Your Score");
    resultContainer.append(resultHeading);

    score = score+"/5";
    var resultScore = $("<h1>").text(score);
    resultContainer.append(resultScore);

    var resultBtn = $("<button>").text("OK");
    resultContainer.append(resultBtn);

    resultBtn.click(function(){
        location.reload();
    })
}
