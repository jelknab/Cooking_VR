window.onload = function () {
    const scene = document.getElementById('scene');
    const camera = document.getElementById('camera');

    class Beef extends Interactable {
        constructor (id) {
            super(id);
            this.isBaked = false;
        }

        interact() {
            player.grabItem(this);
        }
    }

    class Pan extends Interactable {
        constructor (id) {
            super(id);
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
            this.heltItem.setAttribute('position', position);
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

    const interactables = [
        new Pan('pan'),
        new Beef('beef')
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