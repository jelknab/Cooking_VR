import {Player} from "./Player";
import {Interactable} from "./Interactable";
import {Pan} from "./Interactables/pan";
import {FridgeDoor} from "./Interactables/FridgeDoor";
import {Fire} from "./effects/Fire";
import {GasKnob} from "./Interactables/GasKnob";

export class Application {
    static player: Player = new Player(
        document.getElementById('camera')
    );

    static interactables: Interactable[] = [
        new Pan('pan'),
        new FridgeDoor('fridge_door')
    ];

    static fireEffects: any[] = [];

    static loadApplication() {
        // Load pit fires
        const fires = document.querySelectorAll(".fire");
        for (let i = 0; i < fires.length; i++) {
            Application.fireEffects.push(
                new Fire(<HTMLElement>fires.item(i))
            );
        }

        // Load gas knobs
        const gasKnobs = document.querySelectorAll(".gas-knob")
        for (let i = 0; i < gasKnobs.length; i++) {
            Application.interactables.push(
                new GasKnob((<HTMLElement>gasKnobs.item(i)).id, Application.fireEffects[i])
            );
        }

    }
}

Application.loadApplication();