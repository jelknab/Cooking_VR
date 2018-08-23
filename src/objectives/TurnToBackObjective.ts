import {AObjective} from "./AObjective";
import {Vec3} from "../Vec3";
import {Application} from "../index";
import {Button} from "../Interactables/Button";

export class TurnToBackObjective extends AObjective {
    button: Button;

    constructor() {
        super("Please look at the cutting board\nbehind you to get started.")
    }

    protected onDestroy(): void {
    }

    protected onInit(): void {
        this.button = new Button("Go", "#0C0", null, () => {
            this.button.remove();
            this.progressObjective();
        });
        this.button.setPosition(new Vec3(-5, 0, 4));
        this.button.setRotation(new Vec3(0, 180, 0));
    }

}