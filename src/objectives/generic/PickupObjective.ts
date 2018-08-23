import {AObjective} from "../AObjective";
import {Vec3} from "../../Vec3";
import {AInteractable} from "../../Interactables/AInteractable";

export class PickupObjective extends AObjective {
    private target: AInteractable;

    constructor (private target_id: string, instruction_pos: Vec3, instruction_rot: Vec3, private hold_rot: Vec3) {
        super(`Pick up the ${target_id}`, instruction_pos, instruction_rot);
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

    protected onInit(): void {
        this.target = new AInteractable(this.target_id, () => {
            this.player.equip(this.target, this.hold_rot);
            this.target.stopListening();
            this.progressObjective();
        });


        this.marker.showAt(this.target.getPosition());
    }

}