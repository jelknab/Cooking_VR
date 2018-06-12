import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {Application} from "../index";
import {Vec3} from "../Vec3";

/* OBJECTIVE GOAL
* Pick up the sauce pan
*/
export class Objective03 extends AObjective {
    private pan: AInteractable;

    constructor() {
        super("I've marked the spaghetti pan.\nLook at it to pick it up.")
    }

    onInit(): void {
        this.pan = new AInteractable(
            "pan",
            () => {
                Application.instance.player.equip(this.pan, new Vec3(25, 50, 0));
                Application.instance.progressObjective();
            }
        );

        Application.instance.marker.show(this.pan.getPosition());
    }

    onDestroy(): void {
        this.pan.stopListening();
        Application.instance.marker.hide();
    }

}