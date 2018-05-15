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
            fireOn: {
                default: '0 0 0'
            },
            fireOff: {
                default: '0 0 0'
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
                    gases[data.index].setAttribute('position', data.fireOff);
                } else {
                    anim.setAttribute('to', '0 -180 0');
                    gasbools[data.index] = true;
                    gases[data.index].setAttribute('position', data.fireOn);
                }
                this.append(anim);
            });
        }
    });

    // gasknop5.addEventListener('mouseenter', function() {
    //     let anim = document.createElement('a-animation');
    //     anim.setAttribute('attribute', 'rotation');
    //     anim.setAttribute('dur', '1500');
    //     if(!gasbool5) {
    //         anim.setAttribute('to', '0 -180 0');
    //         gasbool5 = true;
    //         gas5.setAttribute('position', '-6.6 -2.5 -4.2');
    //     } else {
    //         anim.setAttribute('to', '0 0 0');
    //         gasbool5 = false;
    //         gas5.setAttribute('position', '-6.6 -3.5 -4.2');
    //     };
    //     this.append(anim);
    // })
};
