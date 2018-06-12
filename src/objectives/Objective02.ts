import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {Application} from "../index";

/* OBJECTIVE GOAL
* Pick up the sauce pan
*/
export class Objective02 extends AObjective {
    private pan: AInteractable;

    constructor() {
        super("I've marked the spaghetti pan.\nLook at it to pick it up.")
    }

    onInit(): void {
        this.pan = new AInteractable(
            "pan",
            () => {
                Application.instance.player.equip(this.pan);
                Application.instance.progressObjective();
            }
        )
    }

    onDestroy(): void {
        this.pan.stopListening();
    }

}