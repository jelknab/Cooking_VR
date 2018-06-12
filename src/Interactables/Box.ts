import {AInteractable} from "./AInteractable";
import {Application} from "../index";
import {Vec3} from "../Vec3";
import {AframeObject} from "../a-frame_wrappers/AframeObject";

export class Box extends AInteractable {
    constructor (position: Vec3, parent: AframeObject, interact: any) {
        const box = document.createElement("a-box");
        super(null, interact, box);

        this.parentTo(parent);
        this.setPosition(position);
    }
}