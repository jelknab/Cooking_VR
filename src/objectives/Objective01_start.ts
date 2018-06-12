import {AObjective} from "./AObjective";
import {Button} from "../Interactables/Button";
import {Application} from "../index";
import {Vec3} from "../Vec3";
import {AInteractable} from "../Interactables/AInteractable";

/* OBJECTIVE GOAL
* Press start
*/
export class Objective01_start extends AObjective {
    private buttons: AInteractable[] = [];

    constructor () {
        super("Welcome future chef!\nAre you ready to begin?")
    }

    onInit(): void {
        this.buttons[0] = new Button("Yes", "#0C0", () => Application.instance.progressObjective());
        this.buttons[0].setPosition(new Vec3(2, 0, -8));

        this.buttons[1] = new Button("Yes", "#0C0", () => Application.instance.progressObjective());
        this.buttons[1].setPosition(new Vec3(-2, 0, -8));
    }

    onDestroy(): void {
        for (let button of this.buttons) {
            button.remove();
        }
    }

}