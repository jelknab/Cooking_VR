import {Interactable} from "../Interactable";
import {Fire} from "../effects/Fire";
import {Application} from "../index";

export class GasPit extends Interactable {
    isActive: boolean = false;

    constructor (id: string, private fireEffect: Fire) {
        super(id);
    }

    interact(): void {
        if (Application.player.isHoldingItem()) {
            Application.player.drop(this.html.getAttribute('position'))
        }
    }

    setActive(value: boolean) {
        console.log(`pit ${this.id} now active.`);

        this.isActive = value;
        this.fireEffect.setState(this.isActive);
    }

    public setVisible(value: boolean) {
        this.html.setAttribute('visible', String(value));
    }
}