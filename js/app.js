$(document).ready(function() {
    var timer = $("#timer");
    var answerBlock = $(".card-container");
    var answerDiv = $("div.answer");
    var question = $("#question");
    var powerButton = $("#power");
    var prompt = $("#prompt");
    var correctPrompt = $("#correct");
    var incorrectPrompt = $("#incorrect");
    var valid = false;
    var isRunning = false;
    var guess = false;
    var bankSize = bank.length;
    var correct = 0;
    var incorrect = 0;
    var count = 8;
    var counter = null;
    var answer = "";


    function initGame() {
        count = 8;
        correct = 0;
        incorrect = 0;
        var score = 0;
        answer = "";
        isRunning = true;
        correctPrompt.text("Correct Answers: " + correct);
        incorrectPrompt.text("Incorrect Answers: " + incorrect);

    }

    function tick() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            //counter is zero, mark answer wrong, go to next question
            timer.text("Time's Up!");
            valid = false;
            checkAnswer("no answer");
            while (!valid) {
                console.log(valid);
                valid = drawBank();
            }
            return;
        }
        //show countdown
        timer.text(count);
    }

    function startTimer() {
        counter = setInterval(tick, 1000);
    }

    function clearTimer() {
        clearInterval(counter);
        timer.empty();
        count = 8;
    }

    function resetTimer() {
        clearInterval(counter);
        timer.text(8);
        count = 8;
        startTimer();
    }

    function pauseTimer() {
        clearInterval(counter);
    }


    function drawBank() {
        var select = Math.floor(Math.random() * bankSize);
        var bankFull = false;
        for (banks in bank) {
            if (bank[banks].status === true) {
                bankFull = false;
                break;
            } else {
                bankFull = true;
            }

        }
        if (bankFull) {
            finalizeGame();
            timer.empty();
            return true;
        }


        if (bank[select].status === true) {
            question[0].innerHTML = bank[select].question;
            answer = bank[select].answer;
            for (lists in bank[select].list) {
                answerBlock.children().eq(lists)[0].innerHTML = bank[select].list[lists];
            }
            bank[select].status = false;
            return true;
        } else {
            select = Math.floor(Math.random() * bankSize);
            return false;
        }
    }

    function resetBank() {
        for (banks in bank) {
            bank[banks].status = true;
        }
    }

    function checkAnswer(guess) {
        if (answer === guess) {
            correct++;
            console.log("Wins: " + correct);
            console.log("Losses: " + incorrect);
            correctPrompt.text("Correct Answers: " + correct);
            incorrectPrompt.text("Incorrect Answers: " + incorrect);
            clearTimer();
            // prompt.text("You got the right answer!");
            // setTimeout(function() { prompt.empty() }, 2000);
            resetTimer();
        } else if (guess === "no answer") {
            incorrect++;
            console.log("Wins: " + correct);
            console.log("Losses: " + incorrect);
            correctPrompt.text("Correct Answers: " + correct);
            incorrectPrompt.text("Incorrect Answers: " + incorrect);
            clearTimer();
            // prompt.text("You ran out of time! The answer was  " + answer)
            // setTimeout(function() { prompt.empty() }, 2000);
            resetTimer();

        } else {
            incorrect++;
            console.log("Wins: " + correct);
            console.log("Losses: " + incorrect);
            correctPrompt.text("Correct Answers: " + correct);
            incorrectPrompt.text("Incorrect Answers: " + incorrect);
            clearTimer();
            // prompt.text("Wrong answer! The right answer was " + answer)
            // setTimeout(function() { prompt.empty() }, 2000);
            resetTimer();
        }
    }

    function finalizeGame() {
        console.log("Tallying Game Score......")
        clearInterval(counter);
        timer.empty();
        answerBlock.children().empty();
        question.empty();
        isRunning = false;
        powerButton.text("Start New Game");
    }

    initGame();

    powerButton.on('click', function() {
        if (this.innerHTML === "Start") {
            initGame();
            timer.text(8);
            startTimer();
            this.innerHTML = "Reset";
            while (!valid) {
                valid = drawBank();
                console.log(valid);
            }

        } else if (this.innerHTML === "Reset") {
            this.innerHTML = "Start";
            answerBlock.children().empty();
            question.empty();
            clearTimer();
            resetBank();
            valid = false;
            isRunning = false;

        } else if (this.innerHTML === "Start New Game") {
            initGame();
            timer.text(8);
            startTimer();
            clearTimer();
            resetBank();
            this.innerHTML = "Reset";
            valid = false;
            while (!valid) {
                valid = drawBank();
                console.log(valid);
            }
        } else {
            console.log("You broke it somehow....");
        }
    });

    answerDiv.on('click', function() {
        if (isRunning) {
            checkAnswer(this.innerHTML);
            valid = false;
            while (!valid) {
                console.log(valid);
                valid = drawBank();
            }
        }

    });



});