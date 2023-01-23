let questionCount = document.querySelector('.qCount')
let question = document.querySelector('.theQuestion')
let questionChoices = document.querySelectorAll('.choices')
let SumbitBtn = document.querySelector('.submit-button')
let currQuestionCoun = document.querySelector('.current-question')
let addScore = document.querySelector('.score')

let currentQuestion = 0
let score = 0

function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsList = JSON.parse(this.responseText)
            let questionsSize = questionsList.length
            questionCount.innerHTML = questionsSize
            currQuestionCoun.innerHTML = currentQuestion+1

            //Add question data
            addQuestionData(questionsList[currentQuestion], questionsSize)

            //Sumbit
            SumbitBtn.onclick = () => {
                if (currentQuestion <questionsSize-1) {
                    getAnswer(questionsList[currentQuestion], questionsSize)

                    currentQuestion++;
                    currQuestionCoun.innerHTML = currentQuestion+1

                    addQuestionData(questionsList[currentQuestion], questionsSize)
                }
                else{
                    getAnswer(questionsList[currentQuestion], questionsSize)
                    localStorage.setItem('score',score);
                    window.open("score.html","_self")
                }
            }

        }
    };

    myRequest.open("GET", "../questions.JSON", true);
    myRequest.send();
}

getQuestions()





function addQuestionData(obj, count) {
    if (currentQuestion < count) {
        //Add question title
        question.innerHTML = obj['title']

        //Add answers    
        for (let i = 0; i < 4; i++) {
            let choice = `choice_${i + 1}`
            let answer = `answer_${i + 1}`
            questionChoices[i].getElementsByTagName('label')[0].innerHTML = obj[choice][answer]
        }
    }
}

function getAnswer(obj, count) {
    if (currentQuestion < count) {
        let answers = document.getElementsByName("question");

        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                score += obj[answers[i].id][answers[i].dataset.answer]
            }
        }
    }
}



function showScore(){
    let myScore = localStorage.getItem('score')
    addScore.innerHTML = myScore
}
