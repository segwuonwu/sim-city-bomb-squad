//console.log('loaded!');

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

/*-------Functions---------*/
let gameInit = function() {
    //  DOM references
    let domTimer = document.querySelector(".countdown");
    let domResetBtn = document.querySelector(".reset");
    let domWires = document.querySelectorAll("img");

    // set wiresToCut = []
    wiresToCut = [];
    // reset timer
    remainingTime = STARTING_TIME;
    // reset wire imgs
    for (let i = 0; i < 5; i++) {
        domWires[i].src = `img/uncut-${domWires[i].id}-wire.png`;
    }
    // disable button
    domResetBtn.disabled = true;
    // reset background
    document.querySelector("body").classList.remove("flat-city");
    document.querySelector("body").classList.add("happy-city");

    // set wires to be cut (includes pushing to wiresToCut)
    for (let wire in wires) {
        let rand = Math.random();
        if (rand > 0.5) {
            wiresToCut.push(wire);
        }
    }
    console.log(wiresToCut);
    // start countdown
    // play siren
};

let wireClickHandler = function(e) {
    // check if wires has been cut
    if (!wires[e.target.id].cut) {
        //console.log(e.target.id);
        wires[e.target.id].cut = true;
        // change img
        e.target.src = wires[e.target.id].cutImg;
        // check if it's in wires to cut
        let wireIndex = wiresToCut.indexOf(e.target.id);
        if (wireIndex > -1) {
            console.log("good so far");
            //  take it out of wireToCut
            wiresToCut.splice(wireIndex, 1);
            // run checkWin() 
            checkWin();
        } else {
            console.log("KABOOM");
        }

        //ELSE
        //run losser
        // play bzzz
    }
};

let checkWin = function() {
    console.log("Checking for win...");
    // check the length of wiresToCut
}

document.addEventListener("DOMContentLoaded", function() {
    //do literally everything here


    document.querySelector(".wires").addEventListener("click", wireClickHandler);
    gameInit();
})