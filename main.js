window.onload = function() {
    var camera = document.getElementById('camera');
    var gasknop5 = document.getElementById('gasknop5');
    var gases = [document.getElementById('gas0'), document.getElementById('gas1'), document.getElementById('gas2'), document.getElementById('gas3'), document.getElementById('gas4')];
    var gasbools = [false, false, false, false, false];

    AFRAME.registerComponent('move-on-mouseenter', {
        schema: {
            to: {
                default: '0 0 0'
            }
        },
        init: function() {
            var data = this.data;
            this.el.addEventListener('mouseenter', function() {
                let anim = document.createElement('a-animation');
                anim.setAttribute('attribute', 'position');
                anim.setAttribute('dur', '2000');
                anim.setAttribute('easing', 'linear');
                anim.setAttribute('to', data.to);
                camera.removeChild(camera.lastChild);
                camera.append(anim);
            });
        }
    });

    AFRAME.registerComponent('furnace-button', {
        schema: {
            x: {
                default: '0'
            },
            z: {
                default: '0'
            },
            index: {
                default: '0'
            }
        },
        init: function() {
            var data = this.data;
            this.el.addEventListener('mouseenter', function() {
                let anim = document.createElement('a-animation');
                anim.setAttribute('attribute', 'rotation');
                anim.setAttribute('dur', '1500');
                if(gasbools[data.index]) {
                    anim.setAttribute('to', '0 0 0');
                    gasbools[data.index] = false;
                    gases[data.index].setAttribute('position', data.x + ' -3.5 ' + data.z);
                } else {
                    anim.setAttribute('to', '0 -180 0');
                    gasbools[data.index] = true;
                    gases[data.index].setAttribute('position', data.x + ' -2.5 ' + data.z);
                }
                this.append(anim);
            });
        }
    });
};
