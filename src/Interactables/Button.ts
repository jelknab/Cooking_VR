import {AInteractable} from "./AInteractable";
import {Application} from "../index";

export class Button extends AInteractable {
    constructor (message: string, color: string, onPress: any) {
        const button = document.createElement("a-entity");
        button.setAttribute('text', `value: ${message}; color: #fff; width: 20; align: center`);
        button.setAttribute('geometry', 'primitive: plane; height: auto; width: 2');
        button.setAttribute('material', `color: ${color}`);

        Application.instance.world.appendChild(button);
        super(null, onPress, button);
    }
}