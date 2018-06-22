import {AObjective} from "../AObjective";
import {AInteractable} from "../../Interactables/AInteractable";
import {Vec3} from "../../Vec3";
import {Application} from "../../index";
import {Button} from "../../Interactables/Button";

export class ConfirmationObjective extends AObjective {
    private button: AInteractable;

    constructor (
        private position: Vec3 = new Vec3(0, 1.5, -8),
        private rotation: Vec3 = new Vec3(0, 0, 0),
        private size: number = 15
    ) {
        super("Welcome future chef!\nAre you ready to begin?");
    }

    onInit(): void {
        this.button = new Button("Yes", "#0C0", this.instruction,() => this.progressObjective());
        this.button.setPosition(new Vec3(0, -2, 0));

        this.instruction.setSize(this.size);
        this.instruction.setPosition(this.position);
        this.instruction.setRotation(this.rotation);
    }

    onDestroy(): void {
        this.button.remove();
    }

}