window.onload = function () {
    var box1 = document.getElementById('box1');
    var box2 = document.getElementById('box2');
    var box3 = document.getElementById('box3');
    var box4 = document.getElementById('box4');
    var camera = document.getElementById('camera');
    var cameraAnimation = document.getElementById('cameraAnimation');
    box1.addEventListener('mouseenter', function () {
            camera.setAttribute('position', '-7 0 0');
          }
    );
    box2.addEventListener('mouseenter', function () {
            camera.setAttribute('position', '-2 0 0');
          }
    );
    box3.addEventListener('mouseenter', function () {
            camera.setAttribute('position', '6 0 0');
          }
    );
    box4.addEventListener('mouseenter', function () {
            camera.setAttribute('position', '8 0 0');
          }
    );
  };
