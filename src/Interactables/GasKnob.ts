import {Interactable} from "../Interactable";
import {Fire} from "../effects/Fire";
import {GasPit} from "./GasPit";
import {Application} from "../index";

export class GasKnob extends Interactable {
    fireOn: boolean = false;

    constructor(id: string, private pit: GasPit) {
        super(id);
    }

    interact(): void {
        this.fireOn = !this.fireOn;

        this.pit.setActive(this.fireOn);
    }

    static load() {
        const gasKnobs = document.querySelectorAll(".gas-knob");
        for (let i = 0; i < gasKnobs.length; i++) {
            const pit: GasPit = new GasPit(
                `panSpot${i}`,
                new Fire(
                    document.getElementById(`gas${i}`)
                )
            );

            const knob = new GasKnob(
                (<HTMLElement>gasKnobs.item(i)).id,
                pit
            );

            Application.interactables.push(knob);
            Application.interactables.push(pit);
        }
    }
}