import {Player} from "./Player";
import {Interactable} from "./Interactable";
import {Pan} from "./Interactables/pan";
import {FridgeDoor} from "./Interactables/FridgeDoor";
import {Fire} from "./effects/Fire";
import {GasKnob} from "./Interactables/GasKnob";
import {Beef} from "./Interactables/Beef";
import {Knife} from "./Interactables/Knife";
import {PlaceSpot} from "./Interactables/placeSpot";

export class Application {
    static world: HTMLElement = document.getElementById('scene');

    static player: Player = new Player(
        document.getElementById('camera')
    );

    static interactables: Interactable[] = [
        new Pan('pan'),
        new Beef('beef'),
        new FridgeDoor('fridge_door'),
        new Knife('knife'),
        new PlaceSpot('knifeSpot', null)
    ];

    static loadApplication() {
        // Load gas knobs
        GasKnob.load();
        PlaceSpot.load();
    }
}

Application.loadApplication();