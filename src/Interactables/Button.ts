import {AInteractable} from "./AInteractable";
import {Application} from "../index";
import {AframeObject} from "../a-frame_wrappers/AframeObject";

export class Button extends AInteractable {
    constructor (message: string, color: string, parent: AframeObject, onPress: any) {
        const button = document.createElement("a-entity");
        button.setAttribute('text', `value: ${message}; color: #fff; width: 20; align: center`);
        button.setAttribute('geometry', 'primitive: plane; height: auto; width: 2');
        button.setAttribute('material', `color: ${color}`);

        super(null, onPress, button);

        this.parentTo(parent);
    }
}