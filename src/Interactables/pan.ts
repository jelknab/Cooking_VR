import {Interactable} from "../Interactable";
import {Application} from "../index";
import {GasPit} from "./GasPit";

export class Pan extends Interactable {
    constructor (id: string) {
        super(id);
    }

    interact() {
        Application.player.equip(this);
    }

    onPlayerPickup() {
        for (let interactable of Application.interactables) {
            console.log(interactable.id);
            if (interactable.id.indexOf('panSpot') != -1) {
                (<GasPit>interactable).setVisible(true);
            }
        }
    }

    onPlayerSetDown() {
        for (let interactable of Application.interactables) {
            if (interactable.id.indexOf('panSpot') != -1) {
                (<GasPit>interactable).setVisible(false);
            }
        }
    }
}