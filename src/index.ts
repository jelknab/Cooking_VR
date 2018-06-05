import {Player} from "./Player";
import {Interactable} from "./Interactable";
import {Pan} from "./Interactables/pan";
import {FridgeDoor} from "./Interactables/FridgeDoor";
import {Fire} from "./effects/Fire";
import {GasKnob} from "./Interactables/GasKnob";

export class Application {
    static world: HTMLElement = document.getElementById('scene');

    static player: Player = new Player(
        document.getElementById('camera')
    );

    static interactables: Interactable[] = [
        new Pan('pan'),
        new FridgeDoor('fridge_door')
    ];

    static loadApplication() {
        // Load gas knobs
        GasKnob.load();
    }
}

Application.loadApplication();