import {Interactable} from "../Interactable";
import {Application} from "../index";
import {Vec3} from "../Vec3";

export class Knife extends Interactable {

    constructor (id: string) {
        super(id);
    }

    interact() {
        Application.player.equip(this);
    }

}