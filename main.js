window.onload = function () {
    var scene = document.getElementById('scene');
    var camera = document.getElementById('camera');
    var cursor = document.getElementById('cursor');
    var gases = [document.getElementById('gas0'), document.getElementById('gas1'), document.getElementById('gas2'), document.getElementById('gas3'), document.getElementById('gas4')];
    var gasbools = [false, false, false, false, false];
    var pan = document.getElementById('pan');
    var panEquiped = false;
    var panSpot0 = document.getElementById('panSpot0');
    var panSpot1 = document.getElementById('panSpot1');
    var panSpot2 = document.getElementById('panSpot2');
    var panSpot3 = document.getElementById('panSpot3');
    var panSpot4 = document.getElementById('panSpot4');

    // Pan oppak functie
    pan.addEventListener('mouseenter', function () {
        cursor.append(this);
        panEquiped = true;
        showPanPositions();
      });

    // Maakt alle pan plaats posities zichtbaar
    function showPanPositions() {
      panSpot0.setAttribute('visible', 'true');
      panSpot1.setAttribute('visible', 'true');
      panSpot2.setAttribute('visible', 'true');
      panSpot3.setAttribute('visible', 'true');
      panSpot4.setAttribute('visible', 'true');
    };

    // Maakt alle pan plaats posities onzichtbaar
    function hidePanPositions() {
      panSpot0.setAttribute('visible', 'false');
      panSpot1.setAttribute('visible', 'false');
      panSpot2.setAttribute('visible', 'false');
      panSpot3.setAttribute('visible', 'false');
      panSpot4.setAttribute('visible', 'false');
    };

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
                if (panEquiped) {
                  hidePanPositions();
                  scene.append(pan);
                  panEquiped = false;
                  pan.setAttribute('position', data.x + ' -2.2 ' + data.z);
                };
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
                if (gasbools[data.index]) {
                  anim.setAttribute('to', '0 0 0');
                  gasbools[data.index] = false;
                  gases[data.index].setAttribute('visible', 'false');
                } else {
                  anim.setAttribute('to', '0 -180 0');
                  gasbools[data.index] = true;
                  gases[data.index].setAttribute('visible', 'true');
                }

                this.append(anim);
              });
          },
      });
  };
