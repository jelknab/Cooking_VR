window.onload = function () {

    // Objects
    var beef = document.getElementById('beef');
    var book = document.getElementById('book');
    var bookSpotCutting = document.getElementById('bookSpotCutting');
    var bookSpotFurnace = document.getElementById('bookSpotFurnace');
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
    for (i = 0; i < 5; i++) {
        onions[i] = document.getElementById('onion_' + i);
    }
    var onionPositions = [0, 0, 0, 0];
    var onionCuts = [0, 2.4];
    var pan = document.getElementById('pan');
    var scene = document.getElementById('scene');
    var sink_trigger = document.getElementById('sink_trigger');
    var spaghetti = document.getElementById('spaghetti');
    var spaghetPan = document.getElementById('spaghet-pan');
    var panwat = document.getElementById('pan-water');
    var tapButton = document.getElementById('tap_trigger');
    var text = document.getElementById('text');
    var textLines = [];
    var tomatoCan = document.getElementById('tomatoCan');
    var tomatoSauce = document.getElementById('tomatoSauce');

    // Placement cubes
    var panSpots = [];
    for (i = 0; i < 6; i++) {
        panSpots[i] = document.getElementById('panSpot' + i);
    };
    var panAddSpot = document.getElementById('panAddSpot');
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
            beef.setAttribute('position', '-10.5 -2.5 0.3');
            panAddSpot.setAttribute('visible', 'false');
            hideBeefPositions();
        };
    });

    function cookBeef() {
        if (panPositionIndex < 5 && gasActive[panPositionIndex]) {
            objectiveCompleted(8);
            if (beef.parentNode == pan) {
                beefCookingTime = beefCookingTime + 1;
                if (beefCookingTime > 15) {
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
            }
            updateText();
        };
    };


    // book.addEventListener('click', function () {
    //     if (!holdingItem()) {
    //         cursor.append(this);
    //         this.setAttribute('position', '-0.7 -0.5 0');
    //         this.setAttribute('rotation', '-4.846 90 -10.420');
    //         this.setAttribute('scale', '3 3 3');
    //         showBookPositions();
    //     };
    // });

    // bookSpotCutting.addEventListener('click', function () {
    //     scene.append(book);
    //     book.setAttribute('position', '-1.673 -1.559 5.400');
    //     book.setAttribute('rotation', '-4.846 -106.707 -10.420"');
    //     hideBookPositions();
    // });

    // bookSpotFurnace.addEventListener('click', function () {
    //     scene.append(book);
    //     hideBookPositions();
    // });

    // function showBookPositions() {
    //     bookSpotCutting.setAttribute('visible', 'true');
    //     bookSpotFurnace.setAttribute('visible', 'true');
    // }

    // function hideBookPositions() {
    //     bookSpotCutting.setAttribute('visible', 'false');
    //     bookSpotFurnace.setAttribute('visible', 'false');
    // }


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
            anim.setAttribute('to', '0 90 0');
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
            }
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
                let clear = document.createElement('a-animation');
                clear.setAttribute('attribute', 'rotation');
                clear.setAttribute('dur', '1500');
                clear.setAttribute('to', '0 0 0');
                tomatoCan.append(clear);
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
                let clear = document.createElement('a-animation');
                clear.setAttribute('attribute', 'rotation');
                clear.setAttribute('dur', '1500');
                clear.setAttribute('to', '0 0 0');
                oliveOil.append(clear);
            }, 4000);
        }
    });

    function showPanPositions() {
        for (var i = 0; i < panSpots.length; i++) {
            if (i != spaghetPanPositionIndex) {
                panSpots[i].setAttribute('visible', 'true');
            };
        };
    };

    function hidePanPositions() {
        for (var i = 0; i < panSpots.length; i++) {
            panSpots[i].setAttribute('visible', 'false');
        };
    };


    // Sink
    document.getElementById('tap_trigger').addEventListener('click', function () {
        tapOn = !tapOn;

        if (tapOn) {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0.5');
            fillpan();
        } else {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0');
        };
    });

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
        }
    })

    sink_trigger.addEventListener('click', function () {
        if (spaghetPan.parentNode == cursor) {
            objectiveCompleted(0);
            scene.appendChild(spaghetPan);
            spaghetPan.setAttribute('position', '-0.69 -3.21 -5.52');
            spaghetPan.setAttribute('rotation', '180 -44 180');
            panInSink = true;
            hideSpaghetPanPositions();
            loadSpaghetPan();
        };
    });

    function fillpan() {
        if (panInSink && tapOn) {
            objectiveCompleted(1);
            panHasWater = true;
            loadSpaghetPan();
        };
    };

    function showSpaghetPanPositions() {
        sink_trigger.setAttribute('visible', 'true');
        for (var i = 0; i < panSpots.length - 1; i++) {
            if (i != panPositionIndex) {
                panSpots[i].setAttribute('visible', 'true');
            };
        };
    };

    function hideSpaghetPanPositions() {
        sink_trigger.setAttribute('visible', 'false');
        for (var i = 0; i < panSpots.length - 1; i++) {
            panSpots[i].setAttribute('visible', 'false');
        };
    };

    function loadSpaghetPan() {
        if (panHasWater) {
            panwat.setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 1');
        };
        loadSpaghetti();
    };


    // Spaghetti    ------------------------------------------------------------------------------------------------------------
    spaghetti.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this);
            spaghetti.setAttribute('position', '-1 -.6 0');
            spaghetti.setAttribute('rotation', '0 90 0');
            showspaghetPositions();
        }
    });

    spaghettiSpot.addEventListener('click', function () {
        if (spaghetti.parentNode == cursor) {
            scene.append(spaghetti);
            hidespaghetPositions();
        }
    });


    function cookSpaghetti() {
        if (spaghetPanPositionIndex < 5 && gasActive[spaghetPanPositionIndex]) {
            objectiveCompleted(3);
            if (spaghetti.parentNode == spaghetPan && panHasWater) {
                spaghetCookingTime += 1;
                if (spaghetCookingTime > 5) {
                    spaghettiLoadStorage = 'primitive: cone; height: .05; radiusTop: .5; radiusBottom: .2';
                    loadSpaghetti();
                };
            }
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
    }


    // TomatoCan
    tomatoCan.addEventListener('click', function () {
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
            oliveOil.parentNode == cursor
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
        switch (y) {
            case 0:
                nextPage(4, 5);
                break;
            case 1:
                nextPage(6, 6);
                break;
            case 2:
                nextPage(7, 8);
                break;
            case 3:
                nextPage(9, 10);
                break;
            case 4:
                nextPage(11, 11);
                break;
            case 5:
                nextPage(12, 12);
                break;
            case 6:
                y = -1;
                nextPage(12, 14);
                break;
        }
        updateText();
        y+=1;
    }, 3000);

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
                    }
                    if (carrot.parentNode == pan) {
                        carrot.setAttribute('position', '.25 0 .2');
                        loadCarrotPositions();
                    }
                    if (onion.parentNode == pan) {
                        onion.setAttribute('position', '.65 0 .2');
                        loadOnionPositions();
                    }
                    if (tomatoSauceInPan) tomatoSauce.setAttribute('visible', 'true');
                }
                if (spaghetPan.parentNode == cursor) {
                    objectiveCompleted(2);
                    hideSpaghetPanPositions();
                    scene.append(spaghetPan);
                    spaghetPan.setAttribute('position', data.x - .4 + ' -2.1 ' + data.z);
                    spaghetPanPositionIndex = data.index;
                    loadSpaghetPan();

                }

                ;
            });
        },
    });

    // Verplaatst de camera naar de mee gegeven coordinaten bij een mouseenter event
    AFRAME.registerComponent('move-on-mouseenter', {
        schema: {
            to: {
                default: '0 0 0',
            },
        },
        init: function () {
            var data = this.data;
            this.el.addEventListener('click', function () {
                let anim = document.createElement('a-animation');
                anim.setAttribute('attribute', 'position');
                anim.setAttribute('dur', '2000');
                anim.setAttribute('easing', 'linear');
                anim.setAttribute('to', data.to);
                camera.append(anim);
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
};