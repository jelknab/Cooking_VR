import {AObjective} from "./AObjective";
import {AInteractable} from "../Interactables/AInteractable";
import {Application} from "../index";
import {Vec3} from "../Vec3";

/* OBJECTIVE GOAL
* Pick up the sauce pan
*/
export class Objective02 extends AObjective {
    private pan: AInteractable;

    constructor() {
        super("I've marked the sauce pan.\nLook at it to pick it up.")
    }

    onInit(): void {
        this.player.moveTo(new Vec3(-1,0,0));

        this.pan = new AInteractable(
            "pan",
            () => {
                this.player.equip(this.pan, new Vec3(25, 50, 0));
                this.progressObjective();
            }
        );

        this.marker.showAt(this.pan.getPosition());
    }

    onDestroy(): void {
        this.pan.stopListening();
        this.marker.hide();
    }

}