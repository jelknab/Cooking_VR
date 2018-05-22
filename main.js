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
    for (i = 0; i < 5; i++) {
      panSpots[i] = document.getElementById('panSpot' + i);
    };

    var steak = document.getElementById('steak');
    var tapButton = document.getElementById('tap_trigger');
    var spaghetPan = document.getElementById('spaghet-pan');

    // Variables
    var gasActive = [false, false, false, false, false];
    var panEquipped = false;
    var steakEquipped = false;
    var steakInPan = false;
    var tapOn = false;
    var panHasWater = false;
    var panInSink = false;
    var panHasSpaghetti= false;

    // Steak oppak functie
    steak.addEventListener('mouseenter', function () {
        if (!panEquipped) {
          cursor.append(this);
          steakEquipped = true;
        }
      });

    // Pan oppak functie
    pan.addEventListener('mouseenter', function () {
        if (steakEquipped) {
          this.append(steak);
          steak.setAttribute('position', '0 0.1 0');
          steakEquipped = false;
          steakInPan = true;
        }

        cursor.append(this);
        panEquipped = true;
        showPanPositions();
        if (steakInPan) {
          console.log('steak in pan');
          steak.setAttribute('position', '0 0.1 0');
        }
      });

    // Maakt alle pan plaats posities zichtbaar
    function showPanPositions() {
      for (var i = 0; i < 5; i++) {
        panSpots[i].setAttribute('visible', 'true');
      }
    };

    // Maakt alle pan plaats posities onzichtbaar
    function hidePanPositions() {
      for (var i = 0; i < 5; i++) {
        panSpots[i].setAttribute('visible', 'false');
      }
    };

    function fillpan() {
        if (panInSink && !panHasWater && tapOn) {
            var panwat = document.getElementById('pan-water');
            panwat.setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 1');

            panHasWater = true;
        }
    }

    document.getElementById('tap_trigger').addEventListener('mouseenter', function () {
        tapOn = !tapOn;

        if (tapOn) {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0.5');
            fillpan();
        } else {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0');
        }
    });

    spaghetPan.addEventListener('mouseenter', function () {
        if (spaghetPan.parentNode == camera) {
            console.log("YES")
        } else {
            if (!panHasWater && !panInSink) {
                camera.appendChild(spaghetPan);
            }
        }
    });

    document.getElementById('sink_trigger').addEventListener('mouseenter', function () {
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
          },
        init: function () {
            var data = this.data;
            this.el.addEventListener('mouseenter', function () {
                if (panEquipped) {
                  hidePanPositions();
                  scene.append(pan);
                  panEquipped = false;
                  pan.setAttribute('position', data.x + ' -2.2 ' + data.z);
                  if (steakInPan) {
                    steak.setAttribute('position', '0 0.1 0');
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
            this.el.addEventListener('mouseenter', function () {
                let anim = document.createElement('a-animation');
                anim.setAttribute('attribute', 'position');
                anim.setAttribute('dur', '2000');
                anim.setAttribute('easing', 'linear');
                anim.setAttribute('to', data.to);
                camera.removeChild(camera.lastChild);
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
            this.el.addEventListener('mouseenter', function () {
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
