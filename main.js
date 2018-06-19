window.onload = function () {

    // Objects
    var beef = document.getElementById('beef');
    var book = document.getElementById('book');
    var camera = document.getElementById('camera');
    var carrot = document.getElementById('carrot');
    var carrots = []
    for (i = 0; i < 4; i++) {
        carrots[i] = document.getElementById('carrot_' + i);
    }
    var carrotPositions = [0, 0, 0];
    var carrotCuts = [0, -1.8];
    var cursor = document.getElementById('cursor');
    var cuttingBoard = document.getElementById('cuttingBoard')
    var gases = [];
    for (i = 0; i < 5; i++) {
        gases[i] = document.getElementById('gas' + i);
    };
    var knife = document.getElementById('knife');
    var objectives = [];
    var oliveOil = document.getElementById('oliveOil');
    var oliveOilSpot = this.document.getElementById('oliveOilSpot');
    var onion = document.getElementById('onion');
    var onions = []
    var test = this.document.getElementById('onion_0');
    console.log('why is this null', test);
    for (i = 0; i < 5; i++) {
        onions[i] = document.getElementById('onion_' + i);
        console.log(i, onions[i]);
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


    // Beef
    beef.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this);
            this.setAttribute('position', '-0.7 -0.5 0');
            showBeefPositions();
        }
    });

    beefCounterSpot.addEventListener('click', function () {
        if (beef.parentNode == cursor) {
            scene.append(beef);
            beef.setAttribute('position', '-4.4 -2.1 -5');
            panAddSpot.setAttribute('visible', 'false');
            hideBeefPositions();
        }
    });

    beefFridgeSpot.addEventListener('click', function () {
        if (beef.parentNode == cursor) {
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
            cursor.append(this)
            this.setAttribute('position', '-0.7 -0.5 0');
            showCarrotPositions();
            loadCarrotPositions()
        };

        if (knife.parentNode == cursor &&
            this.parentNode == cuttingBoard &&
            carrotCuts[0] < 3) {
            carrots[carrotCuts[0]].setAttribute('position', carrotCuts[1] + ' 0 0');
            carrotCuts[0] += 1;
            carrotCuts[1] += 0.6;
            saveCarrotPositions();
            cuttingSound();
            if (carrotCuts[0] == 3) {
                objectiveCompleted(5);
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
            cursor.append(this);
            this.setAttribute('position', '0.7 -0.5 0');
            this.setAttribute('rotation', '-90 90 -20')
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
            cursor.append(this);
            showOliveOilPositions();
            this.setAttribute('position', '-2 -1.5 -1');
        }
    });

    oliveOilSpot.addEventListener('click', function () {
        if (oliveOil.parentNode == cursor) {
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
            cursor.append(this)
            this.setAttribute('position', '-0.7 -0.5 0');
            showOnionPositions();
            loadOnionPositions()
        };

        if (knife.parentNode == cursor &&
            this.parentNode == cuttingBoard &&
            onionCuts[0] < 4) {
            console.log("doing this")
            onions[onionCuts[0]].setAttribute('position', '0 0 ' + onionCuts[1]);
            onionCuts[0] += 1;
            onionCuts[1] -= 0.6;
            saveOnionPositions();
            cuttingSound();
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
            cursor.append(this);
            this.setAttribute('position', '0.8 -0.5 0');
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
        if (carrot.parentNode == cursor) {
            objectiveCompleted(14);
            pan.append(carrot);
            carrot.setAttribute('position', '.25 0 .2');
            hideCarrotPositions();
            loadCarrotPositions();
        };
        if (onion.parentNode == cursor) {
            objectiveCompleted(10);
            pan.append(onion);
            onion.setAttribute('position', '.65 0 .2');
            hideOnionPositions();
            loadOnionPositions();
        };
        if (beef.parentNode == cursor) {
            objectiveCompleted(11);
            pan.append(beef);
            beef.setAttribute('position', '0.5 0 0.2');
            hideBeefPositions();
        };
        if (tomatoCan.parentNode == cursor) {
            objectiveCompleted(13);
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 0 -90');
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
        if (oliveOil.parentNode == cursor) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 0 -90');
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
        anim.setAttribute('to', '0 200 90');
        spaghetPan.append(anim);
        window.setTimeout(function () {
            let anim3 = document.createElement('a-animation');
            anim3.setAttribute('attribute', 'rotation');
            anim3.setAttribute('dur', '1500');
            anim3.setAttribute('to', '0 140 0');
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
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0.5');
            fillpan();
        } else {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0');
        };
    }

    spaghetPan.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(spaghetPan);
            spaghetPan.setAttribute('position', '-2.220 -1.760 -1.870');
            spaghetPan.setAttribute('rotation', '0 140 0');
            showSpaghetPanPositions();
            panInSink = false;
            loadSpaghetPan();
        };
    });

    spaghetPanAddSpot.addEventListener('mouseenter', function () {
        if (spaghetti.parentNode == cursor) {
            spaghetPan.append(spaghetti);
            loadSpaghetti();
            hidespaghetPositions();
            objectiveCompleted(6);
        };
        if (strainer.parentNode == cursor) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 200 90');
            strainer.append(anim);
            objectiveCompleted(9);

            window.setTimeout(function () {
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 140 0');
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
        if (pan.parentNode == cursor) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '50 180 0');
            pan.append(anim);
            objectiveCompleted(9);

            window.setTimeout(function () {
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 180 0');
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
        if (spaghetPan.parentNode == cursor) {
            objectiveCompleted(0);
            scene.appendChild(spaghetPan);
            spaghetPan.setAttribute('position', '-0.69 -3.21 -5.52');
            spaghetPan.setAttribute('rotation', '180 -44 180');
            panInSink = true;
            hideSpaghetPanPositions();
            loadSpaghetPan();
            updateWater();
        };
        if (strainer.parentNode == cursor) {
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
        if (spaghetPan.parentNode == cursor) {
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
            cursor.append(this);
            spaghetti.setAttribute('position', '-1 -.6 0');
            spaghetti.setAttribute('rotation', '0 90 0');
            showspaghetPositions();
        };
    });

    spaghettiSpot.addEventListener('click', function () {
        if (spaghetti.parentNode == cursor) {
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
            cursor.append(this);
            strainerInSink = false;
            this.setAttribute('position', '-2.220 -1.760 -1.870');
            this.setAttribute('rotation', '0 140 0');
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
        if (spaghetPan.parentNode == cursor) {
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 200 90');
            spaghetPan.append(anim);
            objectiveCompleted(9);

            window.setTimeout(function () {
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 140 0');
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
        sink_trigger.setAttribute('visible', 'true');
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
        console.log("WORKS");
        if (!holdingItem()) {
            cursor.append(this);
            this.setAttribute('position', '-0.7 -0.5 0');
            showTomatoCanPositions();
        }
    });

    tomatoCanFridgeSpot.addEventListener('click', function () {
        scene.append(tomatoCan);
        hideTomatoCanPositions();
    });

    tomatoCanCounterSpot.addEventListener('click', function () {
        if (tomatoCan.parentNode == cursor) {
            scene.append(tomatoCan);
            tomatoCan.setAttribute('position', '-3.6 -2.05 -5')
            hideTomatoCanPositions();
        }
    });

    function showTomatoCanPositions() {
        tomatoCanFridgeSpot.setAttribute('visible', 'true');
        tomatoCanCounterSpot.setAttribute('visible', 'true')
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideTomatoCanPositions() {
        tomatoCanFridgeSpot.setAttribute('visible', 'false');
        tomatoCanCounterSpot.setAttribute('visible', 'false')
        panAddSpot.setAttribute('visible', 'false');
    };


    // shared stuff
    cutSpot.addEventListener('click', function () {
        if (carrot.parentNode == cursor) {
            cuttingBoard.append(carrot);
            carrot.setAttribute('position', '.35 .17 0');
            hideCarrotPositions();
            loadCarrotPositions();
        }
        if (onion.parentNode == cursor) {
            cuttingBoard.append(onion);
            onion.setAttribute('position', '-.35 .17 0');
            hideOnionPositions();
            loadOnionPositions();
        }
    })

    function holdingItem() {
        if (beef.parentNode == cursor ||
            pan.parentNode == cursor ||
            spaghetPan.parentNode == cursor ||
            carrot.parentNode == cursor ||
            knife.parentNode == cursor ||
            tomatoCan.parentNode == cursor ||
            onion.parentNode == cursor ||
            book.parentNode == cursor ||
            spaghetti.parentNode == cursor ||
            oliveOil.parentNode == cursor ||
            strainer.parentNode == cursor
        ) return true;
        else return false;
    }

    function cuttingSound() {
        let sound = document.createElement('a-sound');
        sound.setAttribute('src', 'Sound/carrotCut.mpeg');
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
                if (pan.parentNode == cursor) {
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
                if (spaghetPan.parentNode == cursor) {
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
                }

                this.append(anim);
            });
        },
    });


    if (typeof AFRAME === 'undefined') {
        throw new Error('Component attempted to register before AFRAME was available.');
      }
      
      var bind = AFRAME.utils.bind;
      var trackedControlsUtils = AFRAME.utils.trackedControls;
      var THREE = AFRAME.THREE;
      
      var DAYDREAM_CONTROLLER_MODEL_OBJ_URL = 'https://raw.githubusercontent.com/TechnoBuddhist/VR-Controller-Daydream/master/vr_controller_daydream.obj';
      var DAYDREAM_CONTROLLER_MODEL_OBJ_MTL = 'https://raw.githubusercontent.com/TechnoBuddhist/VR-Controller-Daydream/master/vr_controller_daydream.mtl';
      
      var GAMEPAD_ID_PREFIX = 'Daydream Controller';
      
      /**
       * Daydream Controller component for A-Frame.
       */
      AFRAME.registerComponent('daydream-controller', {
        /**
         * Set if component needs multiple instancing.
         */
        multiple: false,
      
        schema: {
          buttonColor: {default: '#FAFAFA'},  // Off-white.
          buttonTouchedColor: {default: 'yellow'},  // Light blue.
          buttonPressedColor: {default: 'orange'},  // Light blue.
          model: {default: true},
          rotationOffset: {default: 0}, // use -999 as sentinel value to auto-determine based on hand
          eyesToElbow: {default: {x: 0.175, y: -0.3, z: -0.03}}, // vector from eyes to elbow (divided by user height)
          forearm: {default: {x: 0, y: 0, z: -0.175}}, // vector from eyes to elbow (divided by user height)
          defaultUserHeight: {type: 'number', default: 1.6} // default user height (for cameras with zero)
        },
      
        // buttonId
        // 0 - trackpad
        mapping: {
          axis0: 'trackpad',
          axis1: 'trackpad',
          button0: 'trackpad',
          button1: 'menu',
          button2: 'system'
        },
      
        /**
         * Called once when component is attached. Generally for initial setup.
         */
        init: function () {
          this.controllerPresent = false;
          this.isControllerPresent = trackedControlsUtils.isControllerPresent; // to allow mock
          this.buttonStates = {};
          this.previousAxis = [];
          this.onModelLoaded = bind(this.onModelLoaded, this);
          this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
          this.onGamepadConnected = bind(this.onGamepadConnected, this);
          this.onGamepadDisconnected = bind(this.onGamepadDisconnected, this);
        },
      
        tick: function (time, delta) {
          if (!this.controller) return;
          var mesh = this.el.getObject3D('mesh');
          // Update mesh animations.
          if (mesh && mesh.update) { mesh.update(delta / 1000); }
          this.updatePose();
          this.updateButtons();
        },
      
        /**
         * Called when entity resumes.
         * Use to continue or add any dynamic or background behavior such as events.
         */
        play: function () {
          this.checkIfControllerPresent();
          window.addEventListener('gamepadconnected', this.onGamepadConnected, false);
          window.addEventListener('gamepaddisconnected', this.onGamepadDisconnected, false);
        },
      
        /**
         * Called when entity pauses.
         * Use to stop or remove any dynamic or background behavior such as events.
         */
        pause: function () {
          window.removeEventListener('gamepadconnected', this.onGamepadConnected, false);
          window.removeEventListener('gamepaddisconnected', this.onGamepadDisconnected, false);
        },
      
        /**
         * Called when a component is removed (e.g., via removeAttribute).
         * Generally undoes all modifications to the entity.
         */
        // TODO ... remove: function () { },
      
        checkIfControllerPresent: function () {
          var isPresent = this.isControllerPresent(this.el.sceneEl, GAMEPAD_ID_PREFIX, {});
          if (isPresent === this.controllerPresent) { return; }
          this.controllerPresent = isPresent;
          if (isPresent) {
            this.el.addEventListener('model-loaded', this.onModelLoaded);
            this.controller = trackedControlsUtils.getGamepadsByPrefix(GAMEPAD_ID_PREFIX)[0];
            if (!this.data.model) { return; }
            this.el.setAttribute('obj-model', {
              obj: DAYDREAM_CONTROLLER_MODEL_OBJ_URL,
              mtl: DAYDREAM_CONTROLLER_MODEL_OBJ_MTL
            });
          } else {
            this.controller = null;
            this.el.removeAttribute('obj-model');
            this.el.removeEventListener('model-loaded', this.onModelLoaded);
          }
        },
      
        onGamepadConnected: function (evt) {
          this.checkIfControllerPresent();
        },
      
        onGamepadDisconnected: function (evt) {
          this.checkIfControllerPresent();
        },
      
        onModelLoaded: function (evt) {
          var controllerObject3D = evt.detail.model;
          var buttonMeshes;
          if (!this.data.model) { return; }
          buttonMeshes = this.buttonMeshes = {};
          buttonMeshes.menu = controllerObject3D.getObjectByName('AppButton_AppButton_Cylinder.004');
          buttonMeshes.system = controllerObject3D.getObjectByName('HomeButton_HomeButton_Cylinder.005');
          buttonMeshes.trackpad = controllerObject3D.getObjectByName('TouchPad_TouchPad_Cylinder.003');
          // Offset pivot point
          controllerObject3D.position.set(0, 0, -0.04);
        },
      
        updateButtonModel: function (buttonName, state) {
          var color = this.data.buttonColor;
          if (state === 'touchstart' || state === 'up') {
            color = this.data.buttonTouchedColor;
          } else if (state === 'down') {
            color = this.data.buttonPressedColor;
          }
          var buttonMeshes = this.buttonMeshes;
          if (!buttonMeshes) { return; }
          buttonMeshes[buttonName].material.color.set(color);
        },
      
        updatePose: (function () {
          var offset = new THREE.Vector3();
          var position = new THREE.Vector3();
          var controllerQuaternion = new THREE.Quaternion();
          var controllerEuler = new THREE.Euler(0, 0, 0, 'YXZ');
          return function () {
            var controller = this.controller;
            var pose = controller.pose;
            var el = this.el;
            var camera = this.el.sceneEl.camera;
            var cameraComponent = camera.el.components.camera;
            var eyesToElbow = this.data.eyesToElbow;
            var forearm = this.data.forearm;
      
            // get camera position
            position.copy(camera.el.object3D.position);
      
            // set offset for degenerate "arm model" to elbow
            offset.set(
          this.data.hand === 'left' ? -eyesToElbow.x : eyesToElbow.x, // hand is to your left, or right
              eyesToElbow.y, // lower than your eyes
              eyesToElbow.z); // slightly out in front
            // scale offset by user height
            offset.multiplyScalar(cameraComponent.data.userHeight || this.data.defaultUserHeight);
            // apply camera Y rotation (not X or Z, so you can look down at your hand)
            offset.applyAxisAngle(camera.el.object3D.up, camera.el.object3D.rotation.y);
            // apply rotated offset to camera position
            position.add(offset);
      
            // set offset for degenerate "arm model" forearm
            offset.set(forearm.x, forearm.y, forearm.z); // forearm sticking out from elbow
            // scale offset by user height
            offset.multiplyScalar(cameraComponent.data.userHeight || this.data.defaultUserHeight);
            // apply controller X and Y rotation (tilting up/down/left/right is usually moving the arm)
            controllerQuaternion.fromArray(pose.orientation || [0, 0, 0, 1]);
            controllerEuler.setFromQuaternion(controllerQuaternion);
            controllerEuler.set(controllerEuler.x, controllerEuler.y, 0);
            offset.applyEuler(controllerEuler);
            // apply rotated offset to camera position
            position.add(offset);
      
            // set as controller position
            el.setAttribute('position', { x: position.x, y: position.y, z: position.z });
      
            // set controller rotation directly from pose, if any (NO EULER!)
            el.object3D.quaternion.copy(controllerQuaternion);
          };
        })(),
      
        updateButtons: function () {
          if (!this.controller) { return; }
          this.handleTrackpadButton();
          this.handleTrackpadGestures();
        },
      
        handleTrackpadGestures: function () {
          var controllerAxes = this.controller.axes;
          var previousAxis = this.previousAxis;
          var changed = false;
          var i;
          for (i = 0; i < controllerAxes.length; ++i) {
            if (previousAxis[i] !== controllerAxes[i]) {
              changed = true;
              break;
            }
          }
          if (!changed) { return; }
          this.previousAxis = controllerAxes.slice();
          this.el.emit('axismove', {axis: this.previousAxis});
        },
      
        handleTrackpadButton: function () {
          // handle all button states
          var id = 0;
          var buttonState = this.controller.buttons[id];
          var changed = false;
          changed = changed || this.handlePress(id, buttonState);
          changed = changed || this.handleTrackpadTouch(id, buttonState);
          if (!changed) { return; }
          this.el.emit('buttonchanged', {id: id, state: buttonState});
        },
      
        handleMenuButton: function () {
          // TODO: implement when Gamepad API starts returning menu button state
        },
      
        handleSystemButton: function () {
          // TODO: implement when Gamepad API starts returning system button state
        },
      
        /**
        * Determine whether a button press has occured and emit events as appropriate.
        *
        * @param {string} id - id of the button to check.
        * @param {object} buttonState - state of the button to check.
        * @returns {boolean} true if button press state changed, false otherwise.
        */
        handlePress: function (id, buttonState) {
          var buttonStates = this.buttonStates;
          var evtName;
          var buttonName;
          var previousButtonState = buttonStates[id] = buttonStates[id] || {};
          if (buttonState.pressed === previousButtonState.pressed) { return false; }
          if (buttonState.pressed) {
            evtName = 'down';
          } else {
            evtName = 'up';
          }
          this.el.emit('button' + evtName, {id: id});
          buttonName = this.mapping['button' + id];
          this.updateButtonModel(buttonName, evtName);
          previousButtonState.pressed = buttonState.pressed;
          return true;
        },
      
        /**
        * Determine whether a button touch has occured and emit events as appropriate.
        *
        * @param {string} id - id of the button to check.
        * @param {object} buttonState - state of the button to check.
        * @returns {boolean} true if button touch state changed, false otherwise.
        */
        handleTrackpadTouch: function (id, buttonState) {
          var buttonStates = this.buttonStates;
          var evtName;
          var buttonName;
          var previousButtonState = buttonStates[id] = buttonStates[id] || {};
          if (buttonState.touched === previousButtonState.touched) { return false; }
          if (buttonState.touched) {
            evtName = 'start';
          } else {
            evtName = 'end';
          }
          previousButtonState.touched = buttonState.touched;
          this.el.dispatchEvent(new CustomEvent('touch' + evtName, {
            'touches': [], // avoid exception in TouchPanner due to namespace collision
            'detail': {
              id: id,
              state: previousButtonState,
              axis: this.controller.axes
            }
          }));
          buttonName = this.mapping['button' + id];
          this.updateButtonModel(buttonName, 'touch' + evtName);
          return true;
        }
      });
};