const boxes = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");
const colorText = document.querySelector('.colorText');
const msg = document.querySelector(".msg");
const moveNum = document.querySelector(".moveNum");
const winLoss = document.querySelector('.win-loss');
const countdown = document.querySelector(".countdown");
const winLossText = document.querySelector(".win-loss-text");


let GuessColor = "",
    matchColor = "",
    move = 4,
    gameStart = 4,
    myInterval;
let Colors = [];



// ---- Generator random color ----
function colorGenerator() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let RCB = `rgb(${red}, ${green}, ${blue})`;
    Colors.push(RCB);
    return RCB;
}

// ---- This function set GuessColor ----
function setColor() {
    GuessColor = Colors[Math.floor(Math.random() * 6)];
    colorText.textContent = GuessColor;
}

// ----- set box color  ---
function newColor() {
    if (Colors.length === 6) {
        Colors.splice(0, 6);
    }

    for (const box of boxes) {
        box.style.backgroundColor = colorGenerator();
    }
    setColor();
}

newColor();

btn.addEventListener("click", newColor);

// --- check win or loss ----
function win() {
    myInterval = setInterval(() => {
        if (gameStart === 0) {
            winLoss.classList.remove("active");
            moveNum.textContent = move = 4;
            newColor();
            gameStart = 4;
            clearInterval(myInterval);
            return;
        }
        countdown.textContent = --gameStart;
    }, 1000);

    setTimeout(() => {
        msg.textContent = "";
    }, 4000)
}


for (const box of boxes) {
    // ---- event on each box ----
    box.addEventListener("click", (e) => {
        matchColor = e.target.style.backgroundColor;
        // ----set move here --
        moveNum.textContent = --move;


        if (matchColor === GuessColor) {
            winLossText.textContent = "Correct Guess 😎🥳";
            msg.textContent = "Correct Guess";
            countdown.textContent = gameStart;
            winLoss.classList.add("active");
            win();
            return;
        } else {
            msg.textContent = "Try again";
            setTimeout(() => {
                msg.textContent = "";
            }, 3000)
        }

        if (move === 0) {
            winLossText.textContent = "Game End 🥺"
            countdown.textContent = gameStart;
            winLoss.classList.add("active");
            win();
            return;
        }

    });
}







