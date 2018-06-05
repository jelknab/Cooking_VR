window.onload = function () {
    const scene = document.getElementById('scene');
    const camera = document.getElementById('camera');

    class Beef extends Interactable {
        constructor () {
            super('beef');
            this.isBaked = false;
        }

        interact() {
            player.grabItem(this);
        }
    }

    class Pan extends Interactable {
        constructor () {
            super('pan');
            this.interactables = ['beef']; // id's of objects that can interact with the pan
            this.hasBeef = false;
        }

        interact() {
            player.grabItem(this);

            if (this.canInteractWithPan(player.heltItem)) {
                switch (player.heltItem.id) {
                    case 'beef':
                        player.placeItemInObject(this, '0 0.1 0');
                        this.hasBeef = true;
                }
            }
        }

        onItemPickedUp(Interactable) {
            if (this.canInteractWithPan(Interactable)) {
                // Show visible hint that item can be put in pan
            }
        }

        onItemPlaced(Interactable) {
            if (this.canInteractWithPan(Interactable)) {
                // Remove visible hint that item can be put in pan
            }
        }

        canInteractWithPan(Interactable) {
            return this.interactables.indexOf(Interactable.id) !== -1;
        }
    }

    class BigPan extends Interactable {
        constructor () {
            super('spaghet-pan');

            this.hasWater = false;
        }

        interact() {
            player.grabItem(this);
        }

        fill() {
            if (this.hasWater) {
                return;
            }

            const water = document.getElementById('pan-water');
            water.setAttribute('visible', 'true');

            const anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'scale');
            anim.setAttribute('dur', '2000');
            anim.setAttribute('easing', 'linear');
            anim.setAttribute('from', '17 0 17');
            anim.setAttribute('to', '17 10 17');

            water.appendChild(anim);

            this.hasWater = true;
        }
    }

    class Sink extends Interactable {
        constructor () {
            super('sink_trigger');

            this.hasPan = false;
        }

        interact() {
            if (player.isHoldingItem() && player.heltItem.id === "spaghet-pan") {
                player.placeItem("-0.69 -3.21 -5.52");
                this.hasPan = true;
                this.object.setAttribute('visible', 'false');

                if (getInteractableByID('tap_trigger').active) {
                    const pan = getInteractableByID('spaghet-pan');
                    pan.fill.call(pan);
                }
            }
        }

        onItemPickedUp(Interactable) {
            if (Interactable.id === 'spaghet-pan') {
                this.object.setAttribute('visible', 'true');

                if (this.hasPan === true) {
                    this.hasPan = false;
                    this.object.setAttribute('visible', 'false');
                }
            }
        }
    }

    class Tap extends Interactable {
        constructor () {
            super('tap_trigger');

            this.active = false;
            this.water = null;
        }

        interact() {
            this.active = !this.active;

            if (this.active) {
                document.getElementById('water').setAttribute('visible', 'true');

                if (getInteractableByID('sink_trigger').hasPan) {
                    const pan = getInteractableByID('spaghet-pan');
                    pan.fill.call(pan);
                }

                this.water = document.createElement('a-sound');
                this.water.setAttribute('autoplay', 'true');
                this.water.setAttribute('loop', 'false');
                this.water.setAttribute('src', 'water.mp3');
                this.object.appendChild(this.water);
            } else {
                document.getElementById('water').setAttribute('visible', 'false');

                this.object.removeChild(this.water);
            }
        }
    }

    class Player {
        constructor(interactables) {
            this.heltItem = null;
        }

        grabItem(Interactable) {
            if (this.isHoldingItem()) {console.log(`Could not grab item '${Interactable.id}' the player is already holding something.`); return;}

            this.heltItem = Interactable;
            camera.appendChild(Interactable.object);
            Interactable.object.setAttribute('position', '-2 -1 -2');

            for (let interactable of interactables) interactable.onItemPickedUp.call(interactable, Interactable);
        }

        placeItem(position) {
            if (!this.isHoldingItem()) {console.log(`Could not place item, player is not holding anything.`); return;}

            scene.appendChild(this.heltItem.object);
            this.heltItem.object.setAttribute('position', position);
            this.heltItem = null;

            for (let interactable of interactables) interactable.onItemPlaced.call(interactable, Interactable);
        }

        placeItemInObject(Interactable, position) {
            if (!this.isHoldingItem()) {console.log(`Could not place item, player is not holding anything.`); return;}

            Interactable.object.appendChild(this.heltItem.object);
            this.heltItem.object.setAttribute('position', position);
            this.heltItem = null;

            for (let interactable of interactables) interactable.onItemPlaced.call(interactable, Interactable);
        }

        isHoldingItem() {
            return this.heltItem != null;
        }
    }

    function getInteractableByID(id) {
        for (let a of interactables) {
            if (a.id === id) {
                return a;
            }
        }
    }

    const interactables = [
        new Pan(),
        new Beef(),
        new BigPan(),
        new Sink(),
        new Tap()
    ];

    const player = new Player();
};

class Interactable {
    constructor(id) {
        this.id = id;
        this.object = document.getElementById(id);

        const interactMethod = this.interact;
        const thisobj = this;

        this.object.addEventListener(
            'click',
            function () {
                interactMethod.call(thisobj);
            }
        );
    }

    // What happens when object is looked at
    interact() {
        throw new Error('You have to implement the method interact!');
    };

    // Called when user picks up any item
    onItemPickedUp(Interactable) {

    };

    // Called when user places any item
    onItemPlaced(Interactable) {

    }
}