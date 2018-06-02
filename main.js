window.onload = function () {
    // Objects
    var scene = document.getElementById('scene');
    var camera = document.getElementById('camera');
    var cursor = document.getElementById('cursor');
    var gases = [];
    for (i = 0; i < 5; i++) {
      gases[i] = document.getElementById('gas' + i);
    };

    var pan = document.getElementById('pan');
    var panSpots = [];
    for (i = 0; i < 6; i++) {
      panSpots[i] = document.getElementById('panSpot' + i);
    };

    var beef = document.getElementById('beef');
    var panAddSpot = document.getElementById('panAddSpot');
    var beefCounterSpot = document.getElementById('beefCounterSpot');
    var beefFridgeSpot = document.getElementById('beefFridgeSpot');

    var tapButton = document.getElementById('tap_trigger');
    var spaghetPan = document.getElementById('spaghet-pan');

    var knife = document.getElementById('knife');
    var knifeSpot = document.getElementById('knifeSpot');

    // Variables
    var gasActive = [false, false, false, false, false];
    var tapOn = false;
    var panHasWater = false;
    var panInSink = false;
    var panHasSpaghetti = false;
    var panPositionIndex = 5;
    var beefCookingTime = 0;

    // gehakt oppak functie
    beef.addEventListener('click', function () {
        if (!holdingItem()) {
          cursor.append(this);
          this.setAttribute('position', '-0.7 -0.5 0');
          showBeefPositions();
        }
      });

    // gehakt in pan functie
    panAddSpot.addEventListener('mouseenter', function () {
        if (beef.parentNode == cursor) {
          pan.append(beef);
          beef.setAttribute('position', '0 0.1 0');
          hideBeefPositions();
        }
      });

    // gehakt op aanrecht functie
    beefCounterSpot.addEventListener('click', function () {
        if (beef.parentNode == cursor) {
          scene.append(beef);
          beef.setAttribute('position', '-4.4 -2.1 -5');
          panAddSpot.setAttribute('visible', 'false');
          hideBeefPositions();
        }
      });

    // gehakt in koelkast functie
    beefFridgeSpot.addEventListener('click', function () {
        if (beef.parentNode == cursor) {
            scene.append(beef);
            beef.setAttribute('position', '-10.5 -2.5 0.3');
            panAddSpot.setAttribute('visible', 'false');
            hideBeefPositions();
        }
    });

    window.setInterval(function () {
        cookBeef();
      }, 1000);

    function cookBeef() {
      if (panPositionIndex < 5 && gasActive[panPositionIndex] && beef.parentNode == pan) {
        beefCookingTime = beefCookingTime + 1;
        if (beefCookingTime > 5) {
          beef.setAttribute('src', 'Textures/groundbeefCooked.png');
        }
      };
    }

    // Pan oppak functie
    pan.addEventListener('click', function () {
        if (!holdingItem()) {
          cursor.append(this);
          this.setAttribute('position', '-0.7 -0.5 0');
          showPanPositions();
          if (beef.parentNode == pan) {
            beef.setAttribute('position', '0 0.1 0');
          }
        }
      });

    // Maakt alle pan plaats posities zichtbaar
    function showPanPositions() {
      for (var i = 0; i < panSpots.length; i++) {
        panSpots[i].setAttribute('visible', 'true');
      }
    };

    // Maakt alle pan plaats posities onzichtbaar
    function hidePanPositions() {
      for (var i = 0; i < panSpots.length; i++) {
        panSpots[i].setAttribute('visible', 'false');
      }
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

    function fillpan() {
      if (panInSink && !panHasWater && tapOn) {
        var panwat = document.getElementById('pan-water');
        panwat.setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 1');
        panHasWater = true;
      }
    }

    document.getElementById('fridgeDoor').addEventListener('click', function () {
        let anim = document.createElement('a-animation');
        anim.setAttribute('attribute', 'rotation');
        anim.setAttribute('dur', '2000');
        anim.setAttribute('easing', 'linear');
        if(this.getAttribute('rotation').y == 0) {
            anim.setAttribute('to', '0 90 0');
        } else {
            anim.setAttribute('to', '0 0 0');
        }
        this.append(anim);
    });

    document.getElementById('tap_trigger').addEventListener('click', function () {
        tapOn = !tapOn;

        if (tapOn) {
          document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0.5');
          fillpan();
        } else {
          document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0');
        }
      });

    spaghetPan.addEventListener('click', function () {
        if (spaghetPan.parentNode == camera) {
          console.log('YES');
        } else {
          if (!panHasWater && !panInSink && !holdingItem()) {
            camera.appendChild(spaghetPan);
          }
        }
      });

    knife.addEventListener('click', function () {
        cursor.append(this);
        this.setAttribute('position', '0.7 -0.5 0');
        this.setAttribute('rotation', '-90 90 -20')
        knifeSpot.setAttribute('visible', 'true');
    });

    knifeSpot.addEventListener('click', function () {
        scene.append(knife);
        knifeSpot.setAttribute('visible', 'false');
    })

    function holdingItem() {
      if (beef.parentNode == cursor
        || pan.parentNode == cursor
        || spaghetPan.parentNode == camera
        ) return true;
      else return false;
    }

    document.getElementById('sink_trigger').addEventListener('click', function () {
        if (spaghetPan.parentNode == camera && !panHasWater) {
          scene.appendChild(spaghetPan);
          spaghetPan.setAttribute('position', '-0.69 -3.21 -5.52');
          spaghetPan.setAttribute('rotation', '180 -44 180');
          panInSink = true;
          fillpan();
        }
      });

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
                console.log('im doing shit')
                if (pan.parentNode == cursor) {
                  hidePanPositions();
                  scene.append(pan);
                  pan.setAttribute('position', data.x + ' -2.2 ' + data.z);
                  panPositionIndex = data.index;
                  if (beef.parentNode == pan) {
                    beef.setAttribute('position', '0 0.1 0');
                  }
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
