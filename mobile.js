window.onload = function () {
    console.log(navigator.getGamepads());

    // Objects
    var beef = document.getElementById('beef');
    var book = document.getElementById('book');
    var camera = document.getElementById('cameraBox');
    var carrot = document.getElementById('carrot');
    var carrots = []
    for (i = 0; i < 4; i++) {
        carrots[i] = document.getElementById('carrot_' + i);
    }
    var carrotPositions = [0, 0, 0];
    var carrotCuts = [0, -1.8];
    var clockLeft = document.getElementById('clockLeft');
    var clockRight = document.getElementById('clockRight');
    var cuttingBoard = document.getElementById('cuttingBoard')
    var gases = [];
    for (i = 0; i < 5; i++) {
        gases[i] = document.getElementById('gas' + i);
    };
    var hand = document.getElementById('cursor');
    var handBox = document.getElementById('handBox');
    var knife = document.getElementById('knife');
    var objectives = [];
    var oliveOil = document.getElementById('oliveOil');
    var oliveOilSpot = this.document.getElementById('oliveOilSpot');
    var onion = document.getElementById('onion');
    var onions = []
    for (i = 0; i < 5; i++) {
        onions[i] = document.getElementById('onion_' + i);
    }
    var onionPositions = [0, 0, 0, 0];
    var onionCuts = [0, 2.4];
    var pan = document.getElementById('pan');
    var plate = document.getElementById('plate');
    var plateDone = document.getElementById('plateDone');
    var scene = document.getElementById('scene');
    var sink_trigger = document.getElementById('sink_trigger');
    var spaghetti = document.getElementById('spaghetti');
    var spaghetPan = document.getElementById('spaghet-pan');
    var panwat = document.getElementById('pan-water');
    var text = document.getElementById('text');
    var textLines = [];
    var tomatoCan = document.getElementById('tomatoCan');
    var tomatoSauce = document.getElementById('tomatoSauce');
    var tomatoSaucePot = document.getElementById('tomatoSaucePot');

    // Placement cubes
    var panSpots = [];
    for (i = 0; i < 6; i++) {
        panSpots[i] = document.getElementById('panSpot' + i);
    };
    var panAddSpot = document.getElementById('panAddSpot');
    var plateAddSpot = this.document.getElementById('plateAddSpot')
    var spaghetPanAddSpot = document.getElementById('spaghetPanAddSpot');
    var beefCounterSpot = document.getElementById('beefCounterSpot');
    var beefFridgeSpot = document.getElementById('beefFridgeSpot');
    var knifeSpot = document.getElementById('knifeSpot');
    var carrotFridgeSpot = document.getElementById('carrotFridgeSpot');
    var onionFridgeSpot = document.getElementById('onionFridgeSpot');
    var cutSpot = document.getElementById('cutSpot');
    var tomatoCanFridgeSpot = document.getElementById('tomatoCanFridgeSpot');
    var tomatoCanCounterSpot = document.getElementById('tomatoCanCounterSpot');
    var spaghettiSpot = document.getElementById('spaghettiSpot');
    var strainer = document.getElementById('strainer');
    var strainerInSink = false;
    var strainerSpot = document.getElementById('strainerSpot');
    var strainerAddSpot = document.getElementById('strainerAddSpot');
    var spaghetPanSpot = document.getElementById('spaghetPanSpot');


    // Variables
    var beefCookingTime = 0;
    var spaghetCookingTime = 0;
    var gasActive = [false, false, false, false, false];
    var panHasSpaghetti = false;
    var panHasWater = false;
    var panInSink = false;
    var panPositionIndex = 5;
    var spaghetPanPositionIndex = 6;
    var tapOn = false
    var tomatoSauceInPan = false;
    var tomatoSauceInPot = false;
    var spaghettiLoadStorage = 'primitive: cone; height: .5; radiusTop: .6; radiusBottom: .2';
    var bookPages = [0, 3];
    var moveLeft = false;
    var moveRight = false;


    // Beef
    beef.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this);
            this.setAttribute('position', '0.5 -1 -1.870');
            showBeefPositions();
        }
    });

    beefCounterSpot.addEventListener('click', function () {
        if (beef.parentNode == hand) {
            scene.append(beef);
            beef.setAttribute('position', '-4.4 -2.1 -5');
            panAddSpot.setAttribute('visible', 'false');
            hideBeefPositions();
        }
    });

    beefFridgeSpot.addEventListener('click', function () {
        if (beef.parentNode == hand) {
            scene.append(beef);
            panAddSpot.setAttribute('visible', 'false');
            hideBeefPositions();
        };
    });

    function cookBeef() {
        if (panPositionIndex < 5 && gasActive[panPositionIndex]) {
            objectiveCompleted(8);
            if (beef.parentNode == pan) {
                beefCookingTime = beefCookingTime + 1;
                if (beefCookingTime > 10) {
                    objectiveCompleted(12);
                    beef.setAttribute('src', 'Textures/groundbeefCooked.png');
                };
            };
        };
    };

    function showBeefPositions() {
        beefCounterSpot.setAttribute('visible', 'true');
        beefFridgeSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    }

    function hideBeefPositions() {
        beefCounterSpot.setAttribute('visible', 'false');
        beefFridgeSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    }


    // Book
    //0 Done
    textLines.push("Place the pot in the sink");
    //1 Done
    textLines.push("Fill it with water");
    //2 Done
    textLines.push("Put it on the stove");
    //3 Done
    textLines.push("And turn on the heat");
    //4 Done
    textLines.push("Great, now let's cut an onion while we wait for the water to start boiling (it is in the fridge)");
    //5 Done
    textLines.push("Do the same with a carrot");
    //6 Done
    textLines.push("Ah lovely, I can hear the water boiling. That means it's time to put the spaghetti in.");
    //7 Done
    textLines.push("Time to make the sauce, start by putting the frying pan on the stove");
    //8 Done
    textLines.push("And turn the heat on");
    //9 Done
    textLines.push("Now that the pan is steaming we add some olive Oil");
    //10 Done
    textLines.push("And quickly add the sliced onion");
    //11 Done
    textLines.push("The onion has gotten some colour now which means it is time to add the minced meat (it's in the fridge)");
    //12 Done
    textLines.push("Almost done, wait a little till the meat is completely cooked");
    //13 Done
    textLines.push("Now add the canned tomatoes (fridge)");
    //14 Done
    textLines.push("And the carrot you cut earlier");
    //15 Done
    textLines.push("Spaghetti time, put the strainer in the sink");
    //16 Done
    textLines.push("And poor the spaghetti in there");
    //17 Done
    textLines.push("To mix it all up poor the spaghetti back in the pot");
    //18 Done
    textLines.push("And do the same with the sauce");
    //19 Done
    textLines.push("Final step: plate up")
    for (var i = 0; i < textLines.length; i++) {
        objectives[i] = false;
    };
    updateText();

    function updateText() {
        let textToShow = '';
        for (let i = bookPages[0]; i < bookPages[1] + 1; i++) {
            textToShow += isDone(i) + textLines[i] + '\n';
        }
        text.setAttribute('value', textToShow);
    };

    function nextPage(start, end) {
        bookPages = [start, end];
    }

    function isDone(i) {
        if (objectives[i]) {
            return '[x]'
        };
        return '[ ]'
    };

    function objectiveCompleted(i) {
        if ((i == 0 || objectives[i - 1]) && !objectives[i]) {
            objectives[i] = true;
            switch (i) {
                case 3:
                    nextPage(4, 5);
                    break;
                case 5:
                    nextPage(6, 6);
                    break;
                case 6:
                    nextPage(7, 8);
                    break;
                case 8:
                    nextPage(9, 10);
                    break;
                case 10:
                    nextPage(11, 11);
                    break;
                case 11:
                    nextPage(12, 12);
                    break;
                case 12:
                    nextPage(12, 14);
                    break;
                case 14:
                    nextPage(15, 16);
                    break;
                case 16:
                    nextPage(17, 18);
                    break;
                case 18:
                    nextPage(19, 19);
                    break;
            }
            updateText();
        };
    };


    // Carrot
    carrot.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this)
            this.setAttribute('position', '.25 -1 -1.870');
            showCarrotPositions();
            loadCarrotPositions()
        };

        if (knife.parentNode == hand &&
            this.parentNode == cuttingBoard &&
            carrotCuts[0] < 3) {
            carrots[carrotCuts[0]].setAttribute('position', carrotCuts[1] + ' 0 0');
            carrotCuts[0] += 1;
            carrotCuts[1] += 0.6;
            saveCarrotPositions();
            playSound('carrotCut.mpeg');
            if (carrotCuts[0] == 3) {
                objectiveCompleted(5);
                playSound('waterBoiling.mp3');
            }
        };
    });

    carrotFridgeSpot.addEventListener('click', function () {
        scene.append(carrot);
        hideCarrotPositions();
        loadCarrotPositions();
    });

    function showCarrotPositions() {
        carrotFridgeSpot.setAttribute('visible', 'true');
        cutSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideCarrotPositions() {
        carrotFridgeSpot.setAttribute('visible', 'false');
        cutSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    };

    function saveCarrotPositions() {
        for (i = 0; i < 3; i++) {
            carrotPositions[i] = carrots[i].getAttribute('position').x;
        };
    };

    function loadCarrotPositions() {
        for (i = 0; i < 3; i++) {
            carrots[i].setAttribute('position', carrotPositions[i] + ' 0 0');
        };
    };


    // Clock

    clockLeft.addEventListener('mouseenter', function () {
        moveLeft = true;
    });

    clockLeft.addEventListener('mouseleave', function () {
        moveLeft = false;
    });

    clockRight.addEventListener('mouseenter', function () {
        moveRight = true;
    });

    clockRight.addEventListener('mouseleave', function () {
        moveRight = false;
    });

    function moveToLeft() {
        if (moveLeft) {
            let x = camera.getAttribute('position').x - .05;
            if (x > -10) {
                let z = camera.getAttribute('position').z;
                camera.setAttribute('position', x + " -1 " + z);
                handBox.setAttribute('position', x + " -1 " + z);
            }
        }
    };

    function moveToRight() {
        if (moveRight) {
            let x = camera.getAttribute('position').x + .05;
            if (x < 6.5) {
                let z = camera.getAttribute('position').z;
                camera.setAttribute('position', x + " -1 " + z);
                handBox.setAttribute('position', x + " -1 " + z);
            }
        }
    };

    window.setInterval(function () {
        moveToLeft();
        moveToRight();
    }, 20);


    // Fridge
    document.getElementById('fridgeDoor').addEventListener('click', function () {
        let anim = document.createElement('a-animation');
        anim.setAttribute('attribute', 'rotation');
        anim.setAttribute('dur', '2000');
        anim.setAttribute('easing', 'linear');
        if (this.getAttribute('rotation').y == 0) {
            anim.setAttribute('to', '0 -90 0');
        } else {
            anim.setAttribute('to', '0 0 0');
        };
        this.append(anim);
    });


    // Knife
    knife.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this);
            this.setAttribute('position', '.5 -1.76 -1.87');
            this.setAttribute('rotation', '-90 110 -20');
            knifeSpot.setAttribute('visible', 'true');
        };
    });

    knifeSpot.addEventListener('click', function () {
        scene.append(knife);
        knifeSpot.setAttribute('visible', 'false');
    });

    // Olive oil
    oliveOil.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this);
            showOliveOilPositions();
            this.setAttribute('position', '0.5 -1 -1.870');
        }
    });

    oliveOilSpot.addEventListener('click', function () {
        if (oliveOil.parentNode == hand) {
            scene.append(oliveOil);
            hideOliveOilPositions();
        }
    });

    function showOliveOilPositions() {
        oliveOilSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideOliveOilPositions() {
        oliveOilSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    };

    // Onion
    onion.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this)
            this.setAttribute('position', '.5 -1 -1.870');
            showOnionPositions();
            loadOnionPositions()
        };

        if (knife.parentNode == hand &&
            this.parentNode == cuttingBoard &&
            onionCuts[0] < 4) {
            console.log("doing this")
            onions[onionCuts[0]].setAttribute('position', '0 0 ' + onionCuts[1]);
            onionCuts[0] += 1;
            onionCuts[1] -= 0.6;
            saveOnionPositions();
            playSound('carrotCut.mpeg');
            if (onionCuts[0] == 4) {
                objectiveCompleted(4);
            }
        };
    });

    onionFridgeSpot.addEventListener('click', function () {
        scene.append(onion);
        hideOnionPositions();
        loadOnionPositions();
    });

    function showOnionPositions() {
        onionFridgeSpot.setAttribute('visible', 'true');
        cutSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideOnionPositions() {
        onionFridgeSpot.setAttribute('visible', 'false');
        cutSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    };

    function saveOnionPositions() {
        for (i = 0; i < 4; i++) {
            onionPositions[i] = onions[i].getAttribute('position').z;
        };
    };

    function loadOnionPositions() {
        for (i = 0; i < 4; i++) {
            onions[i].setAttribute('position', ' 0 0 ' + onionPositions[i]);
        };
    };


    // Pan
    pan.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this);
            this.setAttribute('position', '0.5 -1.760 -1.870');
            this.setAttribute('rotation', '0 110 0');
            showPanPositions();
            if (beef.parentNode == pan) {
                beef.setAttribute('position', '0.5 0 0.2');
            };
            if (carrot.parentNode == pan) {
                carrot.setAttribute('position', '.25 0 .2');
                loadCarrotPositions();
            };
            if (onion.parentNode == pan) {
                onion.setAttribute('position', '.65 0 .2');
                loadOnionPositions();
            };
            if (tomatoSauceInPan) {
                tomatoSauce.setAttribute('visible', 'true');
            };
        };
    });

    panAddSpot.addEventListener('mouseenter', function () {
        if (carrot.parentNode == hand) {
            objectiveCompleted(14);
            pan.append(carrot);
            carrot.setAttribute('position', '.25 0 .2');
            hideCarrotPositions();
            loadCarrotPositions();
        };
        if (onion.parentNode == hand) {
            objectiveCompleted(10);
            pan.append(onion);
            onion.setAttribute('position', '.65 0 .2');
            hideOnionPositions();
            loadOnionPositions();
        };
        if (beef.parentNode == hand) {
            objectiveCompleted(11);
            playSound('cookingBeef.mp3');
            pan.append(beef);
            beef.setAttribute('position', '0.5 0 0.2');
            hideBeefPositions();
        };
        if (tomatoCan.parentNode == hand) {
            objectiveCompleted(13);
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 0 90');
            tomatoCan.append(anim);
            tomatoSauceInPan = true;

            window.setTimeout(function () {
                tomatoSauce.setAttribute('visible', 'true');
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 0 0');
                tomatoCan.append(anim3);
            }, 2500);
            window.setTimeout(function () {
                tomatoCan.removeChild(tomatoCan.lastChild);
                tomatoCan.removeChild(tomatoCan.lastChild);
            }, 4000);
        };
        if (oliveOil.parentNode == hand) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 0 90');
            oliveOil.append(anim);
            objectiveCompleted(9);

            window.setTimeout(function () {
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 0 0');
                oliveOil.append(anim3);
            }, 2500);
            window.setTimeout(function () {
                oliveOil.removeChild(oliveOil.lastChild);
                oliveOil.removeChild(oliveOil.lastChild);
            }, 4000);
        }
    });

    function showPanPositions() {
        for (var i = 0; i < panSpots.length; i++) {
            if (i != spaghetPanPositionIndex) {
                panSpots[i].setAttribute('visible', 'true');
            };
        };
        spaghetPanAddSpot.setAttribute('visible', 'true');
    };

    function hidePanPositions() {
        for (var i = 0; i < panSpots.length; i++) {
            panSpots[i].setAttribute('visible', 'false');
        };
        spaghetPanAddSpot.setAttribute('visible', 'false');
    };

    // Plate
    plateAddSpot.addEventListener('click', function () {
        let anim = document.createElement('a-animation');
        anim.setAttribute('attribute', 'rotation');
        anim.setAttribute('dur', '1500');
        anim.setAttribute('to', '0 180 -90');
        spaghetPan.append(anim);
        window.setTimeout(function () {
            let anim3 = document.createElement('a-animation');
            anim3.setAttribute('attribute', 'rotation');
            anim3.setAttribute('dur', '1500');
            anim3.setAttribute('to', '0 1800 0');
            spaghetPan.append(anim3);
            spaghetPan.removeChild(spaghetti);
            spaghetPan.removeChild(onion);
            spaghetPan.removeChild(carrot);
            spaghetPan.removeChild(beef);
            tomatoSaucePot.setAttribute('visible', 'false');
            tomatoSauceInPot = false;
            plate.setAttribute('visible', 'false');
            plateDone.setAttribute('visible', 'true');
            plateAddSpot.setAttribute('visible', 'false');
        }, 2500);
        window.setTimeout(function () {
            objectiveCompleted(19);
            spaghetPan.removeChild(spaghetPan.lastChild);
            spaghetPan.removeChild(spaghetPan.lastChild);
        }, 4000);
    });

    // Sink
    document.getElementById('tap_trigger').addEventListener('click', function () {
        tapOn = !tapOn;
        updateWater();
    });

    function updateWater() {
        if (tapOn) {
            playSound('waterTap.mp3');
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0.5');
            fillpan();
        } else {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0');
        };
    };

    spaghetPan.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(spaghetPan);
            spaghetPan.setAttribute('position', '0.5 -1.760 -1.870');
            spaghetPan.setAttribute('rotation', '0 180 0');
            showSpaghetPanPositions();
            panInSink = false;
            loadSpaghetPan();
        };
    });

    spaghetPanAddSpot.addEventListener('mouseenter', function () {
        if (spaghetti.parentNode == hand) {
            spaghetPan.append(spaghetti);
            loadSpaghetti();
            hidespaghetPositions();
            objectiveCompleted(6);
        };
        if (strainer.parentNode == hand) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 180 -90');
            strainer.append(anim);
            objectiveCompleted(9);

            window.setTimeout(function () {
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 180 0');
                strainer.append(anim3);
                if (spaghetti.parentNode == strainer) {
                    objectiveCompleted(17);
                    spaghetPan.append(spaghetti);
                    loadSpaghetti();
                };
            }, 2500);
            window.setTimeout(function () {
                strainer.removeChild(strainer.lastChild);
                strainer.removeChild(strainer.lastChild);
            }, 4000);
        };
        if (pan.parentNode == hand) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '-50 110 0');
            pan.append(anim);
            objectiveCompleted(9);

            window.setTimeout(function () {
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 110 0');
                pan.append(anim3);
                if (carrot.parentNode == pan) {
                    spaghetPan.append(carrot);
                };
                if (onion.parentNode == pan) {
                    spaghetPan.append(onion);
                };
                if (beef.parentNode == pan) {
                    spaghetPan.append(beef);
                };
                if (tomatoSauceInPan) {
                    objectiveCompleted(18);
                    tomatoSauce.setAttribute('visible', 'false');
                    tomatoSaucePot.setAttribute('visible', 'true');
                    tomatoSauceInPan = false;
                    tomatoSauceInPot = true;
                }
                loadSpaghetPan();
            }, 2500);
            window.setTimeout(function () {
                pan.removeChild(pan.lastChild);
                pan.removeChild(pan.lastChild);
            }, 4000);
        };
    });

    sink_trigger.addEventListener('click', function () {
        if (spaghetPan.parentNode == hand) {
            objectiveCompleted(0);
            scene.appendChild(spaghetPan);
            spaghetPan.setAttribute('position', '-0.69 -3.21 -5.52');
            spaghetPan.setAttribute('rotation', '180 -44 180');
            panInSink = true;
            hideSpaghetPanPositions();
            loadSpaghetPan();
            updateWater();
        };
        if (strainer.parentNode == hand) {
            objectiveCompleted(15);
            scene.appendChild(strainer);
            strainerInSink = true;
            strainer.setAttribute('position', '-0.69 -2.75 -5.52');
            strainer.setAttribute('rotation', '180 -44 180');
            hideStrainerPositions();
            loadSpaghetti();
        };
    });

    spaghetPanSpot.addEventListener('click', function () {
        if (spaghetPan.parentNode == hand) {
            scene.append(spaghetPan);
            hideSpaghetPanPositions();
            loadSpaghetPan();
        }
    });

    function fillpan() {
        if (panInSink && tapOn) {
            objectiveCompleted(1);
            panHasWater = true;
            loadSpaghetPan();
        };
    };

    function showSpaghetPanPositions() {
        if (!strainerInSink) {
            sink_trigger.setAttribute('visible', 'true');
        }
        for (var i = 0; i < panSpots.length - 1; i++) {
            if (i != panPositionIndex) {
                panSpots[i].setAttribute('visible', 'true');
            };
        };
        if (strainerInSink) {
            strainerAddSpot.setAttribute('visible', 'true');
        }
        spaghetPanSpot.setAttribute('visible', 'true');
        if (carrot.parentNode == spaghetPan &&
            onion.parentNode == spaghetPan &&
            beef.parentNode == spaghetPan &&
            tomatoSauceInPot &&
            spaghetti.parentNode == spaghetPan
        ) {
            plateAddSpot.setAttribute('visible', 'true');
        }
    };

    function hideSpaghetPanPositions() {
        sink_trigger.setAttribute('visible', 'false');
        for (var i = 0; i < panSpots.length - 1; i++) {
            panSpots[i].setAttribute('visible', 'false');
        };
        strainerAddSpot.setAttribute('visible', 'false');
        spaghetPanSpot.setAttribute('visible', 'false');
    };

    function loadSpaghetPan() {
        if (panHasWater) {
            panwat.setAttribute('material', 'opacity: 1');
        } else {
            panwat.setAttribute('material', 'opacity: 0');
        }
        loadSpaghetti();
        if (carrot.parentNode == spaghetPan) {
            carrot.setAttribute('position', '-8.85 14.28 -5.030');
            carrot.setAttribute('scale', '2 2 2');
            carrot.setAttribute('rotation', '0 0 0');
            loadCarrotPositions();
        };
        if (onion.parentNode == spaghetPan) {
            onion.setAttribute('position', '-2.6 13.25 0');
            onion.setAttribute('scale', '4 4 4');
            loadOnionPositions();
        };
        if (beef.parentNode == spaghetPan) {
            beef.setAttribute('position', '-2.6 15.08 0');
            beef.setAttribute('scale', '30 30 30');
        };
        if (tomatoSauceInPot) {
            tomatoSaucePot.setAttribute('visible', 'true');
        }
    };


    // Spaghetti
    spaghetti.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this);
            spaghetti.setAttribute('position', '0.5 -1 -1.870');
            spaghetti.setAttribute('rotation', '0 90 0');
            showspaghetPositions();
        };
    });

    spaghettiSpot.addEventListener('click', function () {
        if (spaghetti.parentNode == hand) {
            scene.append(spaghetti);
            hidespaghetPositions();
        };
    });


    function cookSpaghetti() {
        if (spaghetPanPositionIndex < 5 && gasActive[spaghetPanPositionIndex]) {
            objectiveCompleted(3);
            if (spaghetti.parentNode == spaghetPan && panHasWater) {
                spaghetCookingTime += 1;
                if (spaghetCookingTime == 1) {
                    let anim = document.createElement('a-animation');
                    anim.setAttribute('attribute', 'geometry.radiusTop');
                    anim.setAttribute('dur', '10000');
                    anim.setAttribute('to', '.5');
                    spaghetti.append(anim);
                    let anim2 = document.createElement('a-animation');
                    anim2.setAttribute('attribute', 'geometry.height');
                    anim2.setAttribute('dur', '10000');
                    anim2.setAttribute('to', '.05');
                    spaghetti.append(anim2);
                    spaghettiLoadStorage = 'height: .05; radiusTop: .5;';
                    window.setTimeout(function () {
                        spaghetti.removeChild(spaghetti.lastChild);
                        spaghetti.removeChild(spaghetti.lastChild);
                        spaghetti.setAttribute('src', 'Textures/spaghetti2.png');
                    }, 10000);
                };
            };
        };
    };

    function showspaghetPositions() {
        spaghettiSpot.setAttribute('visible', 'true');
        spaghetPanAddSpot.setAttribute('visible', 'true');
    };

    function hidespaghetPositions() {
        spaghettiSpot.setAttribute('visible', 'false');
        spaghetPanAddSpot.setAttribute('visible', 'false');
    };

    function loadSpaghetti() {
        if (spaghetti.parentNode == spaghetPan) {
            spaghetti.setAttribute('scale', '33 33 33');
            spaghetti.setAttribute('position', '0 15 0');
            spaghetti.setAttribute('rotation', '0 0 0');
            spaghetti.setAttribute('geometry', spaghettiLoadStorage);
        }
        if (spaghetti.parentNode == strainer) {
            spaghetti.setAttribute('scale', '2 2 2');
            spaghetti.setAttribute('position', '0 -0.080 0');
            spaghetti.setAttribute('rotation', '0 0 0');
            spaghetti.setAttribute('geometry', spaghettiLoadStorage);
        }
    }


    // Strainer
    strainer.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this);
            strainerInSink = false;
            this.setAttribute('position', '0.5 -0.850 -1.870');
            this.setAttribute('rotation', '0 180 0');
            showStrainerPositions();
            loadSpaghetti();
        };
    });

    strainerSpot.addEventListener('click', function () {
        scene.append(strainer);
        strainerInSink = false;
        hideStrainerPositions();
        loadSpaghetti();
    });

    strainerAddSpot.addEventListener('click', function () {
        if (spaghetPan.parentNode == hand) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 180 -90');
            spaghetPan.append(anim);
            objectiveCompleted(9);

            window.setTimeout(function () {
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 180 0');
                spaghetPan.append(anim3);
                if (panHasWater) {
                    panHasWater = false;
                    loadSpaghetPan();
                };
                if (spaghetti.parentNode == spaghetPan) {
                    strainer.append(spaghetti);
                    loadSpaghetti();
                    objectiveCompleted(16);
                }
            }, 2500);
            window.setTimeout(function () {
                spaghetPan.removeChild(spaghetPan.lastChild);
                spaghetPan.removeChild(spaghetPan.lastChild);
            }, 4000);
        };
    });

    function showStrainerPositions() {
        if (!panInSink) {
            sink_trigger.setAttribute('visible', 'true');
        };
        strainerSpot.setAttribute('visible', 'true');
        spaghetPanAddSpot.setAttribute('visible', 'true');
    };

    function hideStrainerPositions() {
        sink_trigger.setAttribute('visible', 'false');
        strainerSpot.setAttribute('visible', 'false');
        spaghetPanAddSpot.setAttribute('visible', 'false');
    };

    // TomatoCan
    tomatoCan.addEventListener('click', function () {
        if (!holdingItem()) {
            hand.append(this);
            this.setAttribute('position', '.5 -1 -1.87');
            showTomatoCanPositions();
        }
    });

    tomatoCanFridgeSpot.addEventListener('click', function () {
        scene.append(tomatoCan);
        hideTomatoCanPositions();
    });

    tomatoCanCounterSpot.addEventListener('click', function () {
        if (tomatoCan.parentNode == hand) {
            scene.append(tomatoCan);
            tomatoCan.setAttribute('position', '-3.6 -2.05 -5')
            hideTomatoCanPositions();
        };
    });

    function showTomatoCanPositions() {
        tomatoCanFridgeSpot.setAttribute('visible', 'true');
        tomatoCanCounterSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideTomatoCanPositions() {
        tomatoCanFridgeSpot.setAttribute('visible', 'false');
        tomatoCanCounterSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    };


    // shared stuff
    cutSpot.addEventListener('click', function () {
        if (carrot.parentNode == hand) {
            cuttingBoard.append(carrot);
            carrot.setAttribute('position', '.35 .17 0');
            hideCarrotPositions();
            loadCarrotPositions();
        }
        if (onion.parentNode == hand) {
            cuttingBoard.append(onion);
            onion.setAttribute('position', '-.35 .17 0');
            hideOnionPositions();
            loadOnionPositions();
        }
    })

    function holdingItem() {
        if (beef.parentNode == hand ||
            pan.parentNode == hand ||
            spaghetPan.parentNode == hand ||
            carrot.parentNode == hand ||
            knife.parentNode == hand ||
            tomatoCan.parentNode == hand ||
            onion.parentNode == hand ||
            book.parentNode == hand ||
            spaghetti.parentNode == hand ||
            oliveOil.parentNode == hand ||
            strainer.parentNode == hand
        ) return true;
        else return false;
    }

    function playSound(file) {
        let sound = document.createElement('a-sound');
        sound.setAttribute('src', 'Sounds/' + file);
        sound.setAttribute('autoplay', 'true');
        scene.append(sound);
    }

    let y = 0;
    window.setInterval(function () {
        cookBeef();
        cookSpaghetti();
    }, 1000);

    // Components

    // Plaats de pan op de meegegeven x en z coordinaten
    AFRAME.registerComponent('place-pan', {
        schema: {
            x: {
                default: '0',
            },
            z: {
                default: '0',
            },
            index: {
                default: '0',
            },
        },
        init: function () {
            var data = this.data;
            this.el.addEventListener('click', function () {
                console.log("this works");
                if (pan.parentNode == hand) {
                    objectiveCompleted(7);
                    hidePanPositions();
                    scene.append(pan);
                    pan.setAttribute('position', data.x + ' -2.1 ' + data.z);
                    panPositionIndex = data.index;
                    if (beef.parentNode == pan) {
                        beef.setAttribute('position', '0.5 0 0.2');
                    };
                    if (carrot.parentNode == pan) {
                        carrot.setAttribute('position', '.25 0 .2');
                        loadCarrotPositions();
                    };
                    if (onion.parentNode == pan) {
                        onion.setAttribute('position', '.65 0 .2');
                        loadOnionPositions();
                    };
                    if (tomatoSauceInPan) tomatoSauce.setAttribute('visible', 'true');
                };
                if (spaghetPan.parentNode == hand) {
                    objectiveCompleted(2);
                    hideSpaghetPanPositions();
                    scene.append(spaghetPan);
                    spaghetPan.setAttribute('position', data.x - .4 + ' -2.1 ' + data.z);
                    spaghetPanPositionIndex = data.index;
                    loadSpaghetPan();
                };
            });
        },
    });

    // Geeft de furnace buttons de functionaliteit om het gas aan te zetten
    AFRAME.registerComponent('furnace-button', {
        schema: {
            index: {
                default: '0',
            },
        },
        init: function () {
            var data = this.data;
            this.el.addEventListener('click', function () {
                let anim = document.createElement('a-animation');
                anim.setAttribute('attribute', 'rotation');
                anim.setAttribute('dur', '1500');
                if (gasActive[data.index]) {
                    anim.setAttribute('to', '0 0 0');
                    gasActive[data.index] = false;
                    gases[data.index].setAttribute('visible', 'false');
                } else {
                    anim.setAttribute('to', '0 -180 0');
                    gasActive[data.index] = true;
                    gases[data.index].setAttribute('visible', 'true');
                    playSound('gasIgnition.mp3');
                }

                this.append(anim);
            });
        },
    });

};