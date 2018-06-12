import {AObjective} from "../AObjective";
import {AInteractable} from "../../Interactables/AInteractable";
import {Vec3} from "../../Vec3";
import {Application} from "../../index";
import {Button} from "../../Interactables/Button";

export class ConfirmationObjective extends AObjective {
    private button: AInteractable;

    constructor (
        private position: Vec3 = new Vec3(2, 0, -8),
        private rotation: Vec3 = new Vec3(0, 0, 0),
        private size: number = 15
    ) {
        super("Welcome future chef!\nAre you ready to begin?");

        Application.instance.instruction.setSize(size);
        Application.instance.instruction.setPosition(position);
        Application.instance.instruction.setRotation(rotation);
    }

    onInit(): void {
        this.button = new Button("Yes", "#0C0", Application.instance.instruction,() => Application.instance.progressObjective());
        this.button.setPosition(new Vec3(0, -2, 0));
    }

    onDestroy(): void {
        this.button.remove();
    }

}