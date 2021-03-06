/*--------------Game State/Global Variables----------*/
let wires = {
    blue: {
        cut: false,
        needsCut: false,
        cutImg: "img/cut-blue-wire.png",
        uncutImg: "img/uncut-blue-wire.png"
    },
    green: {
        cut: false,
        needsCut: false,
        cutImg: "img/cut-green-wire.png",
        uncutImg: "img/uncut-green-wire.png"
    },
    red: {
        cut: false,
        needsCut: false,
        cutImg: "img/cut-red-wire.png",
        uncutImg: "img/uncut-red-wire.png"
    },
    white: {
        cut: false,
        needsCut: false,
        cutImg: "img/cut-white-wire.png",
        uncutImg: "img/uncut-white-wire.png"
    },
    yellow: {
        cut: false,
        needsCut: false,
        cutImg: "img/cut-yellow-wire.png",
        uncutImg: "img/uncut-yellow-wire.png"
    }
};

// Timer
const STARTING_TIME = 30;
let remainingTime = STARTING_TIME;
let wiresToCut = [];
let countdown = null;
let delay = null;
let gameOver = true;

/*-------Functions---------*/
let gameInit = function() {
    //  DOM references
    let domTimer = document.querySelector(".countdown");
    let domResetBtn = document.querySelector(".reset");
    let domWires = document.querySelectorAll("img");
    document.getElementById("success").pause();
    document.getElementById("success").currentTime = 0;

    // tell js game is on
    gameOver = false;
    // set wiresToCut = []
    wiresToCut = [];
    // reset timer
    remainingTime = STARTING_TIME;
    // reset wire imgs
    for (let i = 0; i < 5; i++) {
        domWires[i].src = `img/uncut-${domWires[i].id}-wire.png`;
        // Reset corresponding js wires to be cut
        wires[domWires[i].id].cut = false;
    }
    // disable button
    domResetBtn.disabled = true;
    // reset background
    document.querySelector("body").classList.remove("flat-city");
    document.querySelector("body").classList.add("happy-city");
    // make countdown RED
    domTimer.classList.remove("countdown-saved");
    domTimer.classList.add("countdown-panic");

    // set wires to be cut (includes pushing to wiresToCut)
    // TODO: check for no-win scenario and re-run wire loop
    for (let wire in wires) {
        let rand = Math.random();
        if (rand > 0.5) {
            wiresToCut.push(wire);
        }
    }
    console.log(wiresToCut);
    // play siren
    document.getElementById("siren").play();
    // start countdown
    countdown = setInterval(updateClock, 500);

};

let endGame = function(win) {
    // if win is true, run stuff, else run boom stuff
    clearInterval(countdown);
    clearTimeout(delay);
    gameOver = true;
    document.querySelector(".reset").disabled = false;
    document.getElementById("siren").pause();

    if (win) {
        //TODO: saviour stuff
        console.log("HURRAY!~");
        // make timer green
        document.querySelector(".countdown").classList.remove("countdown-panic");
        document.querySelector(".countdown").classList.add("countdown-saved");

        // talk sounds
        document.getElementById("yay").play();
        document.getElementById("success").play();

    } else {
        console.log("KABOOM");
        // change the background
        document.body.classList.remove("happy-city");
        document.body.classList.add("flat-city");
        // make kabom sound
        document.getElementById("explode").play();
    }
}

let updateClock = function() {
    // TODO count down in miliseconds
    remainingTime--;
    if (remainingTime <= 0) {
        // TODO: End game as loser
        endGame(false);
    }
    document.querySelector('.countdown').textContent = `00:00:${remainingTime < 10 ? "0" + remainingTime : remainingTime}`;
}

let wireClickHandler = function(e) {
    // check if wires has been cut AND if the gane is not over
    if (!wires[e.target.id].cut && !gameOver) {
        //tell js we've cut the wire
        wires[e.target.id].cut = true;
        // change img
        e.target.src = wires[e.target.id].cutImg;
        // play bzzz
        document.getElementById("buzz").play();
        // check if it's in wires to cut
        let wireIndex = wiresToCut.indexOf(e.target.id);
        if (wireIndex > -1) {
            console.log("good so far");
            //  take it out of wireToCut
            wiresToCut.splice(wireIndex, 1);
            // chech if wiresToCut.length === 0
            if (wiresToCut.length === 0) {
                endGame(true);
            }
        } else {
            console.log("KABOOM");
            delay = setTimeout(function() {
                console.log("Yikes, you've got 750 miliseconds");
                endGame(false);
            });
        }

    }
};


document.addEventListener("DOMContentLoaded", function() {
    //do literally everything here
    gameInit();
    // document.addEventListener("mousemove", function() {
    //     document.getElementById("siren").play();
    // })
    document.querySelector(".wires").addEventListener("click", wireClickHandler);
    document.querySelector(".reset").addEventListener("click", gameInit);
});