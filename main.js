window.onload = function() {
    var box1 = document.getElementById('box1');
    var box2 = document.getElementById('box2');
    var box3 = document.getElementById('box3');
    var box4 = document.getElementById('box4');
    var camera = document.getElementById('camera');
    var cameraAnimation = document.getElementById('cameraAnimation');

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
};
