let gameSeq = [];
let userSeq = [];

let gameStarted = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "green", "purple"];

document.addEventListener("keypress", function () {
    if (gameStarted == false) {
        console.log('Game is Started');
        gameStarted = true;
    }
    levelUp()
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level : ${level}`;

    //random button choose
    let randInd = Math.floor(Math.random() * 4);
    let randColor = btns[randInd];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randInd);
    // console.log(randBtn);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);

}


function checkAns(idx) {
    // let idx = level - 1;
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let message = "";

        //If no high Score achieved yet, becouse it is the first time.
        if (highScore == 0) {
            highScore = level;
            message = `Game Over ! Your Score was  ${level}\nPress Any key to Start`;
        }
        // update high score
        else if (level > highScore) {
            highScore = level;
            message = `New High Score : ${highScore} \nPress Any Key to Restart`;
        }else {
            message = `Game Over! Your Score : ${level}\nHigh Score : ${highScore}\nPress Any Key to Start`;
        }

        h2.innerText = message;

        document.querySelector("body").style.background = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);

        reset();
    }
    // console.log("current Level : ", level)

}


function btnPress() {
    // console.log(this);
    let btn = this;
    gameFlash(btn);

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length - 1);

}

let allBtns = document.querySelectorAll(".box1");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// function highestScore() {

// }