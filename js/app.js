$(document).ready(function() {
    var answerBlock = $(".card-container");
    var answerDiv = $("div.answer");
    var question = $("#question");
    var powerButton = $("#power");
    var prompt = $("#prompt");
    var valid = false;
    var isRunning = false;
    var guess = false;
    var bankSize = bank.length;
    var correct = 0;
    var incorrect = 0;
    // console.log(question);


    function initGame() {
    	correct = 0;
    	incorrect = 0;
        var score = 0;
        var answer = "";
        isRunning = true;

        //Random Question Selector

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
        } else {
            incorrect++;
            console.log("Wins: " + correct);

            console.log("Losses: " + incorrect);
        }
    }

    function finalizeGame() {
        console.log("Tallying Game Score......")
        answerBlock.children().empty();
        question.empty();
    }

    initGame();

    powerButton.on('click', function() {
        if (this.innerHTML === "Start") {
            initGame();
            this.innerHTML = "Reset";
            while (!valid) {
                console.log(valid);
                valid = drawBank();
            }

        } else if (this.innerHTML === "Reset") {
            this.innerHTML = "Start";
            answerBlock.children().empty();
            question.empty();
            resetBank();
            valid = false;
            isRunning = false;

        } else {
            console.log("???? Game is Busted");
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