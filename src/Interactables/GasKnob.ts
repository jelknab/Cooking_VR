import {Interactable} from "../Interactable";
import {Fire} from "../effects/Fire";

export class GasKnob extends Interactable {
    fireOn: boolean = false;

    constructor(id: string, private fireEffect: Fire) {
        super(id);
    }

    interact(): void {
        this.fireOn = !this.fireOn;

        this.fireEffect.setState(this.fireOn);
    }
}