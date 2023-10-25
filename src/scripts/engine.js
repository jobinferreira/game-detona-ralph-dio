const state = {
    view: {
        squares: document.querySelectorAll(".square"), 
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")

    },
    
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 30
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play()
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit")
            }
        })
    })
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if(state.values.currentTime <= 0) {
        alert('Game Over! O seu resultado foi: ' + state.values.result);
 
        state.view.score.textContent = 0;
        state.values.result = 0;        
        state.values.currentTime = 30;
    }
    
}

function init() {
    addListenerHitBox();
}

init()