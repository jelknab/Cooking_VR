window.onload = function () {
    const scene = document.getElementById('scene');
    const cameraEntity = document.getElementById('camera');
    const arrowEntity = document.getElementById("marker");
    const objectiveText = document.getElementById('instructions');

    class ObjectiveListener {

        constructor (object, event, func) {
            this.listener = null;
            this.self = this;

            this.object = object;
            this.event = event;
            this.func = func;
        }

        listenAndRemove() {
            const object = this.object;
            const event = this.event;
            const func = this.func;

            const listener = function () {
                func();
                object.removeEventListener(event, listener);
            };

            this.listener = listener;

            this.object.addEventListener(this.event, this.listener);
        }

        listen() {
            const func = this.func;

            if (this.listener != null) {
                return;
            }

            this.listener = function () {
                func();
            };

            this.object.addEventListener(this.event, this.listener);
        }

        remove() {
            this.object.object.removeEventListener(this.event, this.listener);
        }
    }

    const objectives = [
        // Start tutorial objective
        function () {
            const button = createButton("Yes", "#0F0");
            button.setAttribute('position', '0 -2 0');

            setObjectiveText("Welcome chef!\nAre you ready to get cooking?");

            objectiveText.appendChild(button);

            // On mouseover remove button
            new ObjectiveListener(button, 'click', function() {
                objectiveText.removeChild(button);
                completeObjective();
            }).listenAndRemove();
        },

        // filler
        newTimeoutObjective("Awesome! Let's get started :-).", 2000),
        newTimeoutObjective("Start by heating a pan with water.", 3000),

        // Pick up pan objective
        function () {
            const pan = document.getElementById('spaghet-pan');

            setObjectiveText("I've marked the pan.\nLook at it to pick it up.");
            setObjectiveArrow(pan.getAttribute('position'), 1.5);

            new ObjectiveListener(pan, 'click', function() {
                grabObject(pan);
                completeObjective();
            }).listenAndRemove();
        },

        // Place pan in sink objective
        function () {
            const pan = document.getElementById('spaghet-pan');
            const sink = document.getElementById('sink_trigger');

            setObjectiveText("Good job!\nPut it in the sink and we'll fill it up.");
            setObjectiveArrow(sink.getAttribute('position'), 1);

            new ObjectiveListener(sink, 'click', function() {
                placeObject(pan, '-0.69 -3.21 -5.52');
                completeObjective();
            }).listenAndRemove();
        }
    ];

    let activeObjective = objectives[0];
    activeObjective();

    function completeObjective() {
        hideObjectiveArrow();

        const currentIndex = objectives.indexOf(activeObjective);

        if (currentIndex === objectives.length - 1) {
            console.log("All objectives are completed.");
            return;
        }

        activeObjective = objectives[currentIndex + 1];
        activeObjective();
    }

    function grabObject(object) {
        cameraEntity.appendChild(object);
        object.setAttribute('position', '-2 -1 -2');
    }

    function placeObject(object, position) {
        scene.appendChild(object);
        object.setAttribute('position', position);
    }

    function createButton(text, color) {
        const button = document.createElement('a-entity');
        button.setAttribute('text', {value: text, color: '#fff', width: 20, align: 'center'});
        button.setAttribute('geometry', {primitive: 'plane', height: 'auto', width: '2'});
        button.setAttribute('material', {color: color});

        return button;
    }

    function setObjectiveText(text) {
        objectiveText.setAttribute('value', text)
    }

    function setObjectiveArrow(position, heightOffset) {
        arrowEntity.setAttribute('visible', 'true');
        arrowEntity.setAttribute('position', position);
        arrowEntity.getAttribute('position').y += heightOffset;
    }

    function hideObjectiveArrow() {
        arrowEntity.setAttribute('visible', 'false');
    }

    function newTimeoutObjective(text, duration_ms) {
        return function() {
            setObjectiveText(text);

            window.setTimeout(completeObjective, duration_ms);
        };
    }
};