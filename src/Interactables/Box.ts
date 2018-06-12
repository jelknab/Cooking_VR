import {AInteractable} from "./AInteractable";
import {Application} from "../index";
import {Vec3} from "../Vec3";

export class Box extends AInteractable {
    constructor (position: Vec3, interact: any) {
        const box = document.createElement("a-box");
        Application.instance.world.appendChild(box);

        super(null, interact, box);

        this.setPosition(position);
    }
}