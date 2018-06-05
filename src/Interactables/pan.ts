import {Interactable} from "../Interactable";
import {Application} from "../index";

export class Pan extends Interactable {
    constructor (id: string) {
        super(id);
    }

    interact() {
        Application.player.grabItem(this);
    }

    onPlayerPickup() {
        const placeables = document.querySelector(".firePit");

    }

    onPlayerSetDown() {

    }
}